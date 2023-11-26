import React, { useState, useEffect } from 'react';
import {
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Stack,
    SelectChangeEvent,
    Switch,
} from '@mui/material';
import axios from 'axios';

import { IOrder } from '../interfaces/orders';
import { IAccount } from '../interfaces/account';

export const Payment: React.FC = () => {
    const [selectedFriend, setSelectedFriend] = useState<string>('');
    const [amountToPay, setAmountToPay] = useState<string>('');
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
    const [accountData, setAccountData] = useState<IAccount | null>(null);
    const [orders, setOrders] = useState<Array<IOrder>>([]);
    const [selectedAccountOrder, setSelectedAccountOrder] = useState<number>(0);
    const [payPerCustomer, setPayPerCustomer] = useState<boolean>(true);
    const [totalAmount, setTotalAmount] = useState<string>('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/api/orders'
                );
                // Axios automatically throws an error for non-2xx responses
                const data = response.data;
                setOrders(data.orders);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        // Update the "Amount to Pay" field when the selected customer changes
        if (accountData && accountData.orders[selectedAccountOrder]) {
            const selectedCustomerAmount = accountData.orders[
                selectedAccountOrder
            ].reduce((total, order) => total + order.price, 0);
            setAmountToPay(String(selectedCustomerAmount));
        }
    }, [selectedAccountOrder, accountData]);

    const handleAccountOrderChange = (event: SelectChangeEvent<number>) => {
        setSelectedAccountOrder(Number(event.target.value));
    };

    const handleFriendChange = (event: SelectChangeEvent<string>) => {
        const orderId = event.target.value;
        setSelectedFriend(orderId);
        const order = orders.find((o) => o.id === orderId);
        setSelectedOrder(order || null);
    };

    const handlePaymentTypeChange = () => {
        setPayPerCustomer((prev) => !prev);
    };

    const handleGetAccountClick = async () => {
        if (selectedOrder) {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/account/${selectedOrder.id}`
                );
                const account = response.data;
                setAccountData(account.account);

                const selectedCustomerAmount = account.account.orders[
                    selectedAccountOrder
                ].reduce((total: any, order: any) => total + order.price, 0);
                setAmountToPay(String(selectedCustomerAmount));
                setTotalAmount(account.account.total);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }
    };

    const handlePayClick = async () => {
        if (selectedOrder && accountData) {
            try {
                const response = await axios.put(
                    'http://127.0.0.1:8080/api/pay',
                    {
                        accountId: accountData.id,
                        payAmount: payPerCustomer ? amountToPay : totalAmount,
                    }
                );
                console.log('Payment successful:', response.data);
                // Add any further logic or UI updates after successful payment
            } catch (error) {
                console.error('Error in payment:', error);
            }
        }
    };

    return (
        <Stack sx={{ mt: 5 }} spacing={5}>
            <FormControl fullWidth>
                <InputLabel id="friend-label">Orders</InputLabel>
                <Select
                    labelId="friend-label"
                    id="friend-select"
                    value={selectedFriend}
                    label="Select Friend"
                    onChange={handleFriendChange}
                >
                    {orders.map((order) => (
                        <MenuItem key={order.id} value={order.id}>
                            {order.id}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedOrder && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleGetAccountClick}
                >
                    Get Account
                </Button>
            )}
            <h1>
                Pay{' '}
                <Switch
                    checked={payPerCustomer}
                    onChange={handlePaymentTypeChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                {payPerCustomer ? 'per customer' : 'all in one account'}
            </h1>

            {payPerCustomer && selectedOrder && accountData && (
                <FormControl fullWidth>
                    <InputLabel id="account-order-label">
                        Select Order
                    </InputLabel>
                    <Select
                        labelId="account-order-label"
                        id="account-order-select"
                        value={selectedAccountOrder}
                        label="Select Order"
                        onChange={handleAccountOrderChange}
                    >
                        {accountData.orders.map((order, index) => (
                            <MenuItem key={index} value={index}>
                                {`Customer ${index + 1}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            {selectedOrder && accountData && (
                <TextField
                    fullWidth
                    label="Total Amount to Pay"
                    variant="outlined"
                    type="number"
                    value={payPerCustomer ? amountToPay : totalAmount}
                />
            )}

            {selectedOrder && accountData && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePayClick}
                >
                    Pay
                </Button>
            )}
        </Stack>
    );
};
