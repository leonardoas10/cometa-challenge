import { Request, Response } from 'express';
import beerService from '../services/beerService';

const beerController = {
    getBeers: (req: Request, res: Response) => {
        const beers = beerService.getListOfBeers();
        res.json({ success: true, beers });
    },
    generateOrder: async (req: Request, res: Response) => {
        const orderDetails = req.body;
        const order = await beerService.generateOrder(orderDetails);
        res.json({ success: true, order });
    },
    getOrders: (req: Request, res: Response) => {
        const beers = beerService.getOrders();
        res.json({ success: true, beers });
    },
    getAccount: async (req: Request, res: Response) => {
        const accountId = req.params.id;
        const account = await beerService.getAccount(accountId);
        res.json({ success: true, account });
    },
    payAccount: (req: Request, res: Response) => {
        // Implementación para pagar la cuenta
    },
};

export default beerController;
