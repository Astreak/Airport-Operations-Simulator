import { Client } from 'pg';
const connectionString: string | undefined  = process.env.DB_URI;
const client = new Client({
  connectionString: connectionString,
});
client.connect()
  .then(() => {
    console.log('[+] Connected to the PostgreSQL database.');
  })
  .catch((err:any) => {
    console.error('Error connecting to the PostgreSQL database:', err);
  });
export { client };
