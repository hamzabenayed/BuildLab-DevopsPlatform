import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import user from '../modals/user.js';
import { addContributorToProject } from '../controllers/contributor.js';
import project from '../modals/projet.js'
export async function sendemail(req, res) {
    const transporter = nodemailer.createTransport({

        service: "Gmail",
        auth: { 
  
          user:"hamzabenayed786@gmail.com",
          pass: "sdwmbcilfnjwkkgp", 
        },
       // tls: {rejectUnauthorized: false}
   
      });

    const { Project } = req.params;
    const userId = req.params.userId.trim();
    const { email, role, senderemail } = req.body;
    const User1 = await user.findOne({ email });
    const Project1 = await project.findById(Project).populate('user');
    const userValue = Project1.user._id;
    if (String(userValue) !== userId) {
      return     res.status(403).send({ message: "User is not a Maintainer in the project" });
    }

    if (User1) {
        let mailOptions = {
            from: senderemail,
            to: email,
            subject: `You have been invited to join project  `,
            text: `Hello,\n\n has invited you to collaborate on a project & This email will expire in 2 days.`,
            headers: {
                'expires': new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toUTCString()
            },
            html: `<p>Hello,</p><p> ${senderemail} has invited you to collaborate on a new project  as  ${role}.</p>
        <p>You can accept or decline this invitation</p>
        <p>This invitation will expire in 2 days.</p>
        <a target="_blank" href="http://localhost:3000/login" style="background-color: #008CBA; border: none; color: white; padding: 12px 28px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Accepter l'invitation</a>        `

        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(400).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                console.log(mailOptions);
                res.status(200).send('Email sent successfully');
            }

        })
    }
}
export default sendemail;