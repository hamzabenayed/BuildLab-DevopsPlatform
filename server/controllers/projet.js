import project from '../modals/projet.js';
import contributor from "../modals/contributor.js";
/////////////////////////////////////////
import mixpanel from 'mixpanel';
// create an instance of the mixpanel client
var Mixpanel = mixpanel.init('24382e06ab44f0ebb6a5e1913b4d5862');

///////////////////////////////////////
export async function addProject(req, res) {

     try {
          let pro = new project({
               user: req.body.userId,
               name: req.body.name,
               releaseType: req.body.releaseType,
               opSystem: req.body.opSystem,
               platform: req.body.platform,
               contributors: req.body.userId,
          });
          await pro.save();

          const cont = new contributor({ user: pro.user, role: 'Maintainer', projects: pro._id });
          await cont.save();




          res.status(201).send({ message: 'Data saved successfully!' });
     } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'Internal server error' });
     }
}



//Get Projects by User mongoose.Types.ObjectId(user)
export async function getUserPojects(req, res) {
     try { 
          const projects = await project.find({ "contributors.user._id": req.params.user })
          res.json(projects)
     } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
     }

}


//Get User Role by project
export function getUserRole(req, res) {

     contributor.findOne({ project: req.params.project, user: req.params.user }, (err, contributor) => {
          if (err) {
               console.log(err);
               res.status(500).send('Internal server error');
               return;
          }

          if (!contributor) {
               res.status(404).send('Contributor not found');
               return;
          }

          res.send(contributor.role);
     });
}


// Delete project

export async function deleteProject(req, res) {
     const projectId = req.params._id;

     try {
          const contributorWithProject = await contributor.find({ 'projects': projectId });
          //const cont = await contributor.findOne({ 'projects': projectId }).populate('user');;
          console.log(contributorWithProject);
          
               // Remove the project ID from the contributor's projects array
               contributorWithProject.forEach(async (contributor) => {
                    contributor.projects.pull(projectId);
                    await contributor.save();
               });
               // Delete the project
               await project.findOneAndDelete(req.params._id);
               //await cont.findOneAndDelete(contributorWithProject);

               res.status(200).send('Project and associated contributors deleted');
          
          

     } catch (err) {
          res.status(500).json({ error: err });
     }
}


//Get Project Details ById 

//Get Project Details ById 
export async function afficherDetailsProjet(req, res) {

     try {
          const projectId = req.params._id.trim();
          const Project = await project.findById(projectId)
               .populate('user', 'userName')
               .populate('contributors.user', 'userName')
               .populate('name')
               .populate('releaseType')
               .populate('opSystem')
               .populate('platform')

          res.json(Project);
     } catch (error) {
          Mixpanel.track('App Crashed', { error: error });
          console.error(error);
          res.status(500).send({ message: 'Internal server error' });
     }
}
//Update Project

export function updateProject(req, res) {
     const projectId = req.params._id

     const updatedProject = {
          name: req.body.name,
          releaseType: req.body.releaseType,
     };
     project.updateOne({ _id: projectId }, updatedProject).then(
          () => {
               res.status(201).json({
                    message: 'Project updated successfully!'
               });
          }
     ).catch(
          (error) => {
               res.status(400).json({
                    error: error
               });
          }
     );
};




