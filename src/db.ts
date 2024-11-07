import { Pool } from 'pg';
import { config } from 'dotenv';

config();

console.log("host", process.env.POSTGRES_HOST)
console.log("port", process.env.POSTGRES_PORT)
console.log("user", process.env.POSTGRES_USER)
console.log("pass",process.env.POSTGRES_PASSWORD)
console.log("db", process.env.POSTGRES_DB)

export const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});
