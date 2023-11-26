import React, { useState, useEffect } from 'react';
import {
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import { IOrder } from '../interfaces/orders';

export const Payment: React.FC = () => {
    const [selectedFriend, setSelectedFriend] = useState<string>('');
    const [amountToPay, setAmountToPay] = useState<string>('');
    const [orders, setOrders] = useState<Array<IOrder>>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8080/api/orders'
                ); // Reemplaza 'your-api-port' con el puerto de tu API
                if (!response.ok) {
                    throw new Error('Error al obtener las órdenes');
                }

                const data = await response.json();
                setOrders(data.orders); // Ajusta según la estructura de tu respuesta de la API
                console.log('orders => ', data.orders);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleFriendChange = (
        event: SelectChangeEvent<string> // Ajusta el tipo del evento
    ) => {
        setSelectedFriend(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountToPay(event.target.value);
    };

    const handlePayClick = () => {
        // Agrega lógica para manejar el pago aquí
        console.log(`Friend: ${selectedFriend}, Amount: ${amountToPay}`);
    };

    return (
        <Box sx={{ mt: 5 }}>
            <FormControl fullWidth>
                <InputLabel id="friend-label">Select Friend</InputLabel>
                <Select
                    labelId="friend-label"
                    id="friend-select"
                    value={selectedFriend}
                    label="Select Friend"
                    onChange={handleFriendChange}
                >
                    <MenuItem value="friend1">Friend 1</MenuItem>
                    <MenuItem value="friend2">Friend 2</MenuItem>
                    <MenuItem value="friend3">Friend 3</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Amount to Pay"
                variant="outlined"
                type="number"
                value={amountToPay}
                onChange={handleAmountChange}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handlePayClick}
            >
                Pay
            </Button>
        </Box>
    );
};
