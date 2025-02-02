import  user  from "../modals/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import otpGenerator from"otp-generator";
import sendEmail from "../middlewares/nodemailer.js";
import nodemailer from "nodemailer";

import expressJwt from "express-jwt";
import { use } from "i18next";

// ki user yaamel register nhotolo fi ProfilePhoto taswira par defaut esmha default.png w baad ki yaamel login ibadel wahdo
export async function register(req, res) {
  const { userName, email, password } = req.body;

  if (!(userName && password && email)) {
    console.log(email)
    res.status(400).send("All fields are required");
  }

  const oldUser = await user.findOne({ email: email });
  if (oldUser) {
    return res.status(409).send("User already exists");
  }

  let NewUser = new user({
    userName: userName,
    email: email,
    password: await bcrypt.hash(password, 10),
    ProfilePhoto: `${req.protocol}://${req.get("host")}${process.env.IMGURL}/fifa.jpg`,
  });

  user.create(NewUser)
    .then((docs) => {
      // Send the verification email to the user's email address
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
      const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: "Email verification",
        html: `
        <html>
        <head>
          <title>Email Verification</title>
        </head>
        <body style="background-color: #f5f5f5; padding: 10px;">
          <div style="background-color: #ffffff; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px;">
            <h2 style="text-align: center; color: #2c42db;">Verify Your Email</h2>
            <p style="color: #333333;">Dear ${userName},</p>
            <p style="color: #333333;">Please click the button below to verify your email:</p>
            <div style="text-align: center;">
            <a href="http://localhost:3000/login" onclick="emailVerification(event)" style="background-color: blue; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 10px;">Verify Email</a>
            </div>
            <p style="color: #333333;">Thank you for using our service!</p>
            <p style="color: #333333;">The Team</p>
          </div>
        </body>
      </html>
        `,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          res.status(500).send("Failed to send verification email");
        } else {
          res.status(201).json(docs);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to create user");
    });
}

//Verify email 
export async function emailVerification(req, res) {
  const { email } = req.query;
  const user = await user.findOne({ email: email });

  if (!user) {
    return res.status(400).send('User not found');
  }

  // Mark user email as verified
  user.verified = true;
  await user.save();

  res.redirect('http://localhost:3000/login');
}

//LOGIN
export async function login(req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("All fields are required");
  }
  const utilisateur = await user.findOne({email: email });
  console.log(utilisateur)

  if (!utilisateur) {
    return res.status(404).send("Unexistant user");
  }

  if (!(await bcrypt.compare(password, utilisateur.password))) {
    return res.status(401).send("Invalid credentials");
  }

  // const newToken =  jwt.sign({ utilisateur }, process.env.TOKENKEY, {
  //   expiresIn: "4d",
  // });

  // user.token = newToken;
  const secret = crypto.randomBytes(64).toString('hex');
  const token = jwt.sign({ Id: utilisateur._id, email: utilisateur.email, Buildnbr: utilisateur.Buildnbr }, secret, { expiresIn: '1h' });
  const decoded = jwt.verify(token, secret);

  const id1 = decoded.Id;
  const email1 =decoded.email;
  const buildnbr1 =decoded.Buildnbr;
  console.log(id1);
  return res.json({  idfromtoken: id1,emailfromtoken:email1 ,Buildnbrfromtoken:buildnbr1});


  /*
  try {
    await user.updateOne({ _id: user._id, token: newToken });
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
  */
}

export function getById(req, res) {
  user.findById(req.id)
    .then((docs) => {
      
      res.status(200).json(docs)
    })
    .catch((err) => {
      res.status(404).json({ error: "Unvalid ID" });
    });
}
export async function sendOTPResetEmail(req, res) {
  let user = await user.findOne({ email: req.body.Email });
  if (user) {
    //create OTP
    const OTP = Math.floor(1000 + Math.random() * 9000).toString();
    //update OTP in the database
    user.findOneAndUpdate({ _id: user._id }, { OTPReset: OTP })
      .then(async (docs) => {
        //send otp to email
        sendEmail(user.email, "Password Reset", OTP);
        
        
        user.OTPReset = OTP
        
        
        res.status(200).json("OTP generated");
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

//Change password
export async function resetPassword(req, res) {
  
  const user = await user.findOne({ email: req.body.Email });
  

  if (user) {
    if (req.body.OTP === user.OTPReset) {
      const EncryptedPassword = await bcrypt.hash(req.body.Password, 10);

      await user.findOneAndUpdate(
        { _id: user._id },
        {
          password: EncryptedPassword,
          OTPReset: null

        }
      )
        .then((docs) => {
          user.password =  EncryptedPassword;
          res.status(200).json(docs);
        })
        .catch((err) => {
          res.status(500).json("Error while reseting password");
        });
    }
  }
}

export async function logout(req, res) {
  console.log('Logout endpoint called with email:', req.params.email);
  
  await user.findOneAndUpdate(
    { email: req.params.email },
    { 
      token: null,
    }
  )
    .then((docs) => {
      console.log('User updated:', docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log('Error updating user:', err);
      res.status(500).json({ error: err });
    });
}

async function getProductById(productId) {
  return Product.findOne({ _id: productId }).lean();
}
export async function createCheckOutSession  (req, res) {
  try {
    const lineItems = Array.isArray(req.body) ? req.body : [req.body];
    const productPromises = lineItems.map(async (item) => {
      const product = await getProductById(item.id);
      if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
      }
      if (typeof product.price !== 'number') {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Product price is not a number');
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: Math.round(product.price * 100),
        },
        adjustable_quantity: {
          enabled:true,
          minimum: 1,
        },
        quantity: 1,
      };
    });
    const resolvedProducts = await Promise.all(productPromises);
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card','alipay','acss_debit','wechat_pay','link'],
      payment_method_options: {
        acss_debit: {
          mandate_options: {
            payment_schedule: 'sporadic',
            transaction_type: 'personal',
          },
        },
        wechat_pay: {
          client: 'web',
        },
      },
      mode: 'payment',
      line_items: resolvedProducts,
      success_url:"https:stripe.com/docs/checkout/quickstart?lang=node",
      cancel_url: "https:stripe.com/docs/checkout/quickstart?lang=node",
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};


export async function getUserByEmail(req, res) {
  try {
    const email = req.params.email;
    const result = await user.findOne({ email: email });
    return res.status(200).json({
      user: result
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err
    });
  }
} 

export async function updateUserBuildings(req, res) {
  const { userId, Buildnbr } = req.body;

  try {
    const User = await user.findOneAndUpdate({ _id: userId }, { Buildnbr }, { new: true });

    if (!User) {
      return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé" });
    }

    return res.json({ message: "Nombre de builde changer avec succés" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Nombre de builde changernn" });
  }
}

// Backend part - export as async function

const API_KEY = "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";

// "Explain things like you're talking to a software professional with 2 years of experience."
const systemMessage = {
  role: "system",
  content: "Explain things like you're talking to a software professional with 2 years of experience."
};

  async function processMessageToChatGPT(chatMessages) {
  let apiMessages = chatMessages.map((messageObject) => {
    let role = "";
    if (messageObject.sender === "ChatGPT") {
      role = "assistant";
    } else {
      role = "user";
    }
    return { role: role, content: messageObject.message };
  });

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage, ...apiMessages]
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    });

    const data = await response.json();

    return {
      message: data.choices[0].message.content,
      sender: "ChatGPT"
    };
  } catch (error) {
    console.error("Error processing message to ChatGPT:", error);
    return null;
  }
}

export { processMessageToChatGPT };


export async function UpdateUser(req, res) {
  try {
    let updatedUser = {
      id: req.body.id,
      userName: req.body.userName,
      email: req.body.email,
    };
    const savedUser = await user.findByIdAndUpdate(req.body.id, { $set: updatedUser }, { new: true });
    res.status(202).send(
      JSON.stringify({
        id: savedUser._id,
        userName: savedUser.userName,
        email: savedUser.email,
        token: "",
      })
    );
  } catch (error) {
    console.log(error);
    return res.json({
      message: "an error occured when updating user",
    });
  }
};





  