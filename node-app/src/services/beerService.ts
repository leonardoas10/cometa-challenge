import { IOrder, IReqGenerateOrder } from '../interfaces/order';
import { IAccount } from '../interfaces/account';
import { v4 as uuidv4 } from 'uuid';

// In Memory DB of orders
let orders: Array<IOrder> = [];
let accounts: Array<IAccount> = [];

const beerService = {
    // Simulating a list of available beers
    availableBeers: [
        { id: 1, name: 'Beer A', price: 5 },
        { id: 2, name: 'Beer B', price: 10 },
        { id: 3, name: 'Beer C', price: 20 },
    ],

    // Function to get the list of available beers
    getListOfBeers: () => {
        return beerService.availableBeers;
    },

    getOrders: () => {
        return orders;
    },

    generateOrder: async (orderDetail: IReqGenerateOrder): Promise<IOrder> => {
        const order: IOrder = {
            id: uuidv4(),
            clientName: orderDetail.clientName,
            orders: orderDetail.orders,
            timestamp: new Date(),
        };
        orders.push(order);
        return order;
    },

    getAccount: async (id: string): Promise<IAccount | undefined> => {
        let account: IAccount = {} as IAccount;
        const foundOrder = orders.find((order) => order.id === id);
        if (foundOrder) {
            const { orders, total } = await getDetailOrders(foundOrder.orders);
            account.clientName = foundOrder.clientName;
            account.timestamp = new Date();
            account.id = foundOrder.id;
            account.orders = orders;
            account.total = total;
            account.restForPay = total;
            accounts.push(account);
            return account;
        }
        return undefined;
    },
};

const getDetailOrders = async (orders: number[]) => {
    // Assuming availableBeers is an array of available beers
    const selectedBeers = beerService.availableBeers.filter((beer) =>
        orders.includes(beer.id)
    );

    // Calculate total
    const total = selectedBeers.reduce((acc, beer) => acc + beer.price, 0);

    return { orders: selectedBeers, total };
};

export default beerService;
