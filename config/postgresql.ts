import client from 'pg';

const pool = new client.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'twitter',
    password: 'admin',
    port: 5432,
});

export default pool;