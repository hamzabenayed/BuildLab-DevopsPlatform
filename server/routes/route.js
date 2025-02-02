import  express  from "express";
import { body } from "express-validator";
import Users from "../modals/user.js";
import user from "../modals/user.js";
import {sendemail} from "../middlewares/emailinvitation.js";
import { addProject,addContributorToProject,getContributorRoleByUerID, deleteContributorFromProject} from "../controllers/contributor.js";
import { updateUserBuildings,getUserByEmail,register, login, logout, sendOTPResetEmail, resetPassword, emailVerification, createCheckOutSession, } from "../controllers/authController.js";
import stripe from 'stripe';
import cors from 'cors'; // Import 'cors' module


import multer from 'multer';
import { afficherDetailsProjet, deleteProject, getUserPojects, getUserRole, updateProject } from "../controllers/projet.js";

const router = express.Router();

//const express = require('express');
const stripeInstance = stripe('sk_test_51MqaoYLC0ozEF4ITuFwZjupVv72iQAVwZv14AgsGOvjjJnBwedCiohyUE93vWKzdIVhRH00pASbv0brOcUdAVPls001PT5aPNm');
const app = express();
app.use(express.static('public'));
app.use(cors());
///////////////////////////////////////////////////////////////////////
router.route("/register").post(register);
router.route("/login").post(login);


router.route("/updateUserBuildings").put(updateUserBuildings);
router.route("/logout/:email").post(logout);
router.route("/OTPReset").post(sendOTPResetEmail);
router.route("/ResetPassword").post(resetPassword);
router.route("/emailVerification").post(emailVerification);
router.route("/createCheckOutSession").post(createCheckOutSession);

router.route("/getUserByEmail/:email").get(getUserByEmail);



/////////////////////////////////////////////////////////////////////////

app.post('/create-checkout-session', async (req, res) => {
       try {
         const session = await stripeInstance.checkout.sessions.create({
           line_items: [
             {
               price_data: {
                 currency: 'usd',
                 product_data: {
                   name: 'Abonnement Buid Lab',
                   images: ['https://rachelcorbett.com.au/wp-content/uploads/2018/10/Should-you-tell-people-to-%E2%80%98subscribe-to-your-podcast.jpg'], // Replace with the actual image URL
                 },
                 unit_amount: 2000, // 2000 cents = $20
               },
               quantity: 1,
             },
           ],
           mode: 'payment',
           success_url: 'http://localhost:3000/PaymentValidate', // Replace with your success URL
           cancel_url: 'https://example.com/cancel', // Replace with your cancel URL
         });
     
         res.status(200).json({ url: session.url });
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     });
     
     app.listen(8084, () => console.log('Running on port 4242'));



 ///////////////////////////////////////////////////////////////////////////

router.route('/project/addProject/').post(
        body('user'),
        body('name'),
        body('releaseType'),
        body('opSystem'),
        body('platform'),
        body('contributors'),addProject); 
////////////////////////////////////////////////////////////////
       router.route('/addcontributortoproject/:Project/:userId').post( body('email'), body('role'),addContributorToProject)
       router.route('/emailinvitation/:Project/:userId').post(sendemail);
       router.route('/DeleteContributor/:projectId/:userId').delete(deleteContributorFromProject)
       router.route('/getcontributorrole/:user').get(getContributorRoleByUerID)  
////////////////////////////////////////////////////////////////


router.route('/project/myProjects/:user')
       .get(getUserPojects)

router.route('/project/myRole/:project/:user')
       .get(getUserRole)


router.route('/project/deleteProject/:_id')
       .delete(deleteProject)

router.route('/project/updateProject/:_id')
       .put(updateProject)

router.route('/afficherDetailsProjet/:_id')
       .get(afficherDetailsProjet)



 
export default router;
