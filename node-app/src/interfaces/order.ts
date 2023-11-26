export interface IOrder {
    id: string;
    orders: number[][];
    timestamp: Date;
}

export interface IReqGenerateOrder {
    orders: number[][];
}
