import { Request, Response } from 'express';
import beerService from '../services/beerService';

const beerController = {
    getBeers: (req: Request, res: Response) => {
        const beers = beerService.getListOfBeers();
        res.status(200).json({ success: true, message: 'Beers list', beers });
    },
    generateOrder: async (req: Request, res: Response) => {
        const orderDetails = req.body;
        const order = await beerService.generateOrder(orderDetails);
        res.status(201).json({
            success: true,
            message: 'Succesfully generated order',
            order,
        });
    },
    getOrders: (req: Request, res: Response) => {
        const orders = beerService.getOrders();
        res.status(200).json({
            success: true,
            message: 'Previous orders',
            orders,
        });
    },
    getAccount: async (req: Request, res: Response) => {
        const orderId = req.params.orderId;
        const account = await beerService.getAccount(orderId);
        if (!account) {
            res.status(404).json({
                success: false,
                message: 'Account not exist',
            });
        }
        res.status(200).json({
            success: true,
            message: 'This is your account',
            account,
        });
    },
    payAccount: async (req: Request, res: Response) => {
        const payDetails = req.body;
        const updatedAccount = await beerService.payAccount(payDetails);
        if (!updatedAccount) {
            res.status(400).json({
                success: false,
                message: 'Something went wrong in payment process',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Thanks for your payment!',
            updatedAccount,
        });
    },
};

export default beerController;
