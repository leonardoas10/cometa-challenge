import request from 'supertest';
import { app } from '../src/app'; // Import your Express app instance

describe('GET /api/beers', () => {
    it('should return a list of beers', async () => {
        const response = await request(app).get('/api/beers');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('beers');
        expect(response.body.beers).toHaveLength(3);
    });
});

describe('POST /api/order', () => {
    it('should generate an order and return the order in the response', async () => {
        // Mock request body
        const requestBody = {
            orders: [[1, 2], [3]],
        };

        const response = await request(app)
            .post('/api/order') // Adjust the endpoint based on your actual setup
            .send(requestBody)
            .expect(201);

        // Check the response body
        expect(response.body).toEqual({
            success: true,
            message: 'Succesfully generated order',
            order: {
                id: expect.any(String), // Mocked or dynamically generated order ID
                orders: [[1, 2], [3]],
                timestamp: expect.any(String), // Mocked or dynamically generated timestamp
            },
        });
    });
});
