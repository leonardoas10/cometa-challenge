export interface IAccount {
    id: string;
    orderId: string;
    orders: Array<
        Array<{
            name: string;
            price: number;
        }>
    >;
    total: number;
    restForPay: number;
    refundAmount?: number;
    timestamp: Date;
}
