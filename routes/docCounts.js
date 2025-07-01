import express from 'express';
import BestSeller from '../models/BestSeller.js';
import NewLaunch from '../models/NewLaunch.js';
import Order from '../models/Order.js';
import Subscribe from '../models/Subscribe.js';
import Product from '../models/Product.js';

const router = express.Router();

//getall product
router.get('/', async (req, res) => {
  try {
    const product1 = await Product.find().count();
    const product2 = await BestSeller.find().count();
    const product3 = await NewLaunch.find().count();
    const product4 = await Order.find().count();
    const product5 = await Subscribe.find().count();
    const file = await [product1, product2, product3, product4, product5];
    res.status(200).json(file);
  } catch (err) {
    next(err);
  }
});

export default router;
