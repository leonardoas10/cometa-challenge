import { IOrder, IReqGenerateOrder } from '../interfaces/order';
import { IAccount } from '../interfaces/account';
import { IReqPayAccount } from '../interfaces/pay';
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

    getListOfBeers: () => {
        return beerService.availableBeers;
    },

    getOrders: () => {
        return orders;
    },

    generateOrder: async (orderDetail: IReqGenerateOrder): Promise<IOrder> => {
        const order: IOrder = {
            id: uuidv4(),
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
            account.timestamp = new Date();
            account.id = uuidv4();
            account.orderId = foundOrder.id;
            account.orders = orders;
            account.total = total;
            account.restForPay = total;
            accounts.push(account);
            return account;
        }
        return undefined;
    },

    payAccount: async (
        payDetails: IReqPayAccount
    ): Promise<IAccount | undefined> => {
        const foundAccount = accounts.find(
            (account) => account.id === payDetails.accountId
        );
        if (foundAccount) {
            if (foundAccount.restForPay > 0) {
                if (payDetails.payAmount > foundAccount.restForPay) {
                    const refundAmount =
                        payDetails.payAmount - foundAccount.restForPay;
                    foundAccount.restForPay = 0;
                    return { ...foundAccount, refundAmount };
                } else {
                    foundAccount.restForPay -= payDetails.payAmount;
                    return foundAccount;
                }
            } else {
                // Caso 3: restForPay is 0, cannot be pay again.
                return undefined;
            }
        }
        return undefined;
    },
};

const getDetailOrders = async (
    orderIds: number[][]
): Promise<{ orders: Array<Array<any>>; total: number }> => {
    const selectedBeers: Array<Array<any>> = [];

    for (const orderIdGroup of orderIds) {
        const beersInGroup = orderIdGroup.map((orderId) =>
            beerService.availableBeers.find((beer) => beer.id === orderId)
        );

        selectedBeers.push(beersInGroup.filter(Boolean));
    }

    const total = selectedBeers
        .flat() // Flatten the array of arrays into a single array
        .reduce((acc, beer) => acc + beer.price, 0);

    return { orders: selectedBeers, total };
};

export default beerService;
