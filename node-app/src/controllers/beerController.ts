import { Request, Response } from 'express';
import beerService from '../services/beerService';

const beerController = {
    getBeers: (req: Request, res: Response) => {
        const beers = beerService.getListOfBeers();
        res.json({ success: true, message: 'Beers list', beers });
    },
    generateOrder: async (req: Request, res: Response) => {
        const orderDetails = req.body;
        const order = await beerService.generateOrder(orderDetails);
        res.json({
            success: true,
            message: 'Succesfully generated order',
            order,
        });
    },
    getOrders: (req: Request, res: Response) => {
        const beers = beerService.getOrders();
        res.json({ success: true, message: 'Previous orders', beers });
    },
    getAccount: async (req: Request, res: Response) => {
        const orderId = req.params.orderId;
        const account = await beerService.getAccount(orderId);
        if (!account) {
            res.json({ success: false, message: 'Account not exist' });
        }
        res.json({ success: true, message: 'This is your account', account });
    },
    payAccount: async (req: Request, res: Response) => {
        const payDetails = req.body;
        const updatedAccount = await beerService.payAccount(payDetails);
        if (!updatedAccount) {
            res.json({
                success: false,
                message: 'Something went wrong in payment process',
            });
        }
        res.json({
            success: true,
            message: 'Thanks for your payment!',
            updatedAccount,
        });
    },
};

export default beerController;
