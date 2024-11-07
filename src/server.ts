import express, { Express, Request, Response } from "express";
import { pool } from './db';
import { config } from 'dotenv';
import cors from 'cors';

config();

const port = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json());
app.use('*', cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

const createRoutes = () => {
    app.get('/setup', async (req: Request, res: Response) => {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS votes (
                    id SERIAL PRIMARY KEY,
                    choice VARCHAR NOT NULL
                )
            `);
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    });

    app.get('/results', async (req: Request, res: Response) => {
        try {
            const { rows } = await pool.query('SELECT * FROM votes');
            res.status(200).json(rows);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    });

    app.post('/cast', async (req: Request, res: Response) => {
        try {
            const { vote } = req.body;
            await pool.query('INSERT INTO votes (choice) VALUES ($1)', [vote]);
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

const initDB = async () => {
    return await pool.query(`
        CREATE TABLE IF NOT EXISTS votes (
            id SERIAL PRIMARY KEY,
            choice VARCHAR NOT NULL
        )
    `);
}


initDB().then(() => {
    createRoutes();
}).catch(err => {
    console.error(err);
});