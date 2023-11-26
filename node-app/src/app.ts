import express from 'express';
import bodyParser from 'body-parser';
import beerRoutes from './routes/beerRoutes';

const app = express();
const PORT = process.env.NODE_APP_PORT;

app.use(bodyParser.json());
app.use('/api', beerRoutes);

app.listen(PORT, () => {
    console.info(`Servidor escuchando en http://localhost:${PORT}`);
});
