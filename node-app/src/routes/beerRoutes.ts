import express from 'express';
import beerController from '../controllers/beerController';

const router = express.Router();

router.get('/beers', beerController.getBeers);
router.get('/orders', beerController.getOrders);
router.post('/order', beerController.generateOrder);
router.get('/account/:id', beerController.getAccount);
router.post('/pay', beerController.payAccount);

export default router;
