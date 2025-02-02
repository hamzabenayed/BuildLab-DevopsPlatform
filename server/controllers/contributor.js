import user from '../modals/user.js';
import project from '../modals/projet.js'
import contributor from '../modals/contributor.js';
/////////////////////////////////////////
import mixpanel from 'mixpanel';
// create an instance of the mixpanel client
var Mixpanel = mixpanel.init('24382e06ab44f0ebb6a5e1913b4d5862');

///////////////////////////////////////


//////////////////////////////////////////////////////////
export async function addContributorToProject(req, res) {

  // Find the user to be added as a contributor
  try {
    const { Project } = req.params;
    const userId = req.params.userId.trim();
    const { email, role } = req.body;
    const Project1 = await project.findById(Project).populate('user');
    const userValue = Project1.user._id;
    console.log(userValue)
    if (String(userValue) !== userId) {
      res.status(403).send({ message: "User is not a Maintainer in the project" });
    }
    const pp = await project.findOne({ Project });
    const userToAdd = await user.findOne({ email });
   if(!userToAdd){
       res.status(410).json({ message: 'User does not exist'});
    }
    // Check if the user is already a contributor to the project
    const existingContributor = await contributor.findOne({
      user: userToAdd,
      projects: { $in: [pp] },
    });

    if (existingContributor) {
      Mixpanel.track('Contributor Exist', {
        Contributor_email: email,
        Contributor_role: role,

      });
      //console.log('User is already a contributor to the project');
       res.status(409).send({ message: 'User is already a contributor to the project' });
    } else {
      // Create a new contributor for the user and add them to the project's list of contributors
      const newContributor = new contributor({
        role: role,
        user: userToAdd,
        projects: [pp],
      });
      await newContributor.save();
      pp.contributors.push(newContributor);
      await pp.save();
      Mixpanel.track('Contributor Added', {
        new_User_ID: userToAdd._id,
        new_Contributor_role: role,
        Project_Added_to: pp._id

      });
      console.log('User added as a contributor to the project');
       res.status(200).send({ message: 'User added as a contributor to the project' });
    }
  } catch (error) {
    Mixpanel.track('App Crashed', { error: error });
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}

//////////////////////////////////////////////////////////


export async function addProject(req, res) {

  try {
    let pro = new project({
      user: req.body.userId,
      name: req.body.name,
      releaseType: req.body.releaseType,
      opSystem: req.body.opSystem,
      platform: req.body.platform,
    });

    await pro.save();
    const User = await user.findOne({ _id: pro.user });
    const cont = new contributor({
      user: User,
      role: 'Maintainer',
      projects: [pro._id],
    });
    await cont.save();
    pro.contributors.push(cont);
    await pro.save();

  

    Mixpanel.track('New Project Added', {
      User_ID: pro._id,
      Project_Name: pro.name,
      Project_releaseType: pro.releaseType,
      Project_opSystem: pro.opSystem,
      Project_platform: pro.platform,
      Project_contributors: pro.contributors

    });


    res.status(201).send({ message: 'Data saved successfully!' });
  } catch (error) {
    Mixpanel.track('App Crashed', { error: error });
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}


//////////////////////////////////////////////////////////



export async function deleteContributorFromProject(req, res) {
  const projectId = req.params.projectId.trim();
  const userId = req.params.userId.trim();
  const { contributorEmail } = req.body;

  
    // Find the project by its ID
    const Project = await project.findById(projectId).populate('user');
    const userValue = Project.user._id;
    console.log(userValue);
    console.log(userId);

    // Find the contributor by their email address
    const Contributor = await contributor.findOne({ 'user.email': contributorEmail }).populate('user');
    if (String(userValue) !== userId) {
      return res.status(403).send({ message: "User is not a Maintainer in the project" });
    }
    if (!Contributor) {
      return res.status(405).send({ message: "Contributor not found" });
    }

    // Check if the contributor is associated with the project
    const contributorEmails = Project.contributors.map(contributor => contributor.email);
    if (!contributorEmails.includes(Contributor.user.email)) {
      return res.status(404).send({ message: "Contributor not found in the project" });
    }

    // Remove the contributor from the project
    Project.contributors.pull(Contributor);
    await Project.save();

    // Remove the project from the contributor's projects
    Contributor.projects.pull(Project._id);
    await Contributor.save();
    await Contributor.deleteOne({ _id: Contributor._id });

    return res.status(200).send({ message: "Contributor deleted from the project" });
  
}


//////////////////////////////////////////////////////////////////
export  async function getContributorRoleByUerID(req, res)  {
  try {
    const user = req.params.user.trim();
    const foundContributor = await contributor.findOne({ 'user._id': user }).populate('user');
    console.log(foundContributor);
    if (foundContributor) {
      const role = foundContributor.role;
      console.log(role);
      return res.json({ ContributorRole:  role });
    } else {
      res.status(404).json({ message: 'Contributor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};