import Order from "../models/Order.js";
import nodemailer from "nodemailer";
import twilio from "twilio";

export const createwhatsappOrder = async (req, res, next) => {
  const client = twilio(
    process.env.YOUR_ACCOUNT_SID,
    process.env.YOUR_AUTH_TOKEN
  );

  try {
    await client.messages
      .create({
        body: `New Order Placed 🙂

Name:${req.body.name},
Phone:${req.body.number},
Address:${req.body.address1},
          ${req.body.address2},
          ${req.body.address3},
          ${req.body.pincode}
          
Checkout the admin panel🤝`,
        from: "whatsapp:+14155238886",
        to: "whatsapp:+919072777555",
      })
      .then((message) => {
        console.log(message.sid);
        next();
      })
      .done();
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res) => {
  const newProduct = Order(req.body);
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "kmniyas6@gmail.com",
  //     pass: process.env.SEND_MAIL_PASS,
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });
  // var mailOptions = {
  //   from: "kmniyas6@gmail.com",
  //   to: "aonefrunitures@gmail.com",
  //   subject: "New Order Placed",
  //   html: `<h1>Order Recieved</h1><p>Congrats!</p><br/>
  //   <h3>Name:${req.body.name}</h3><br/>
  //   <h3>Email:${req.body.email}</h3><br/>
  //   <h3>Phone:${req.body.number}</h3><br/>
  //   <h3>Address:${req.body.address1},
  //   <br/>${req.body.address2},
  //   <br/>${req.body.address3},
  //   <br/>${req.body.pincode}</h3>`,
  // };

  try {
    const savedProduct = await newProduct.save();

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updatedProduct = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const Product = await Order.findById(req.params.id);
    res.status(200).json(Product);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllOrder = async (req, res, next) => {
  try {
    const Products = await Order.find();
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
