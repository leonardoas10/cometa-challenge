export interface IOrder {
    id: string;
    clientName: string;
    orders: number[];
    timestamp: Date;
}

export interface IReqGenerateOrder {
    clientName: string;
    orders: number[];
}
