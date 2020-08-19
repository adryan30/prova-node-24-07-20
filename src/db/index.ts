import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Banco de Dados conectado'))
  .catch((error) => console.log(error));
