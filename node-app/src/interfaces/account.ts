export interface IAccount {
    id: string;
    clientName: string;
    orders: Array<{
        name: string;
        price: number;
    }>;
    total: number;
    restForPay: number;
    timestamp: Date;
}
