const { Client } = require('pg');

const dbName = 'postgres';
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  password: '123456',
  port: 5432,
};

async function setup() {
  const client = new Client({ ...dbConfig, database: 'postgres' });

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`Banco de dados "${dbName}" criado.`);
  } catch (err) {
    if (err.code === '42P04') {
      console.log(`Banco "${dbName}" já existe.`);
    } else {
      console.error('Erro ao criar banco:', err.message);
      return;
    }
  } finally {
    await client.end();
  }

  const dbClient = new Client({ ...dbConfig, database: dbName });

  try {
    await dbClient.connect();

    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS tarefas (
        id SERIAL PRIMARY KEY,
        texto TEXT NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      );
    `);

    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err.message);
  } finally {
    await dbClient.end();
  }
}

setup();
