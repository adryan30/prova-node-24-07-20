import 'reflect-metadata';
import * as express from 'express';

import './db';
import router from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, () =>
  console.info('Servidor rodando em http://localhost:3000'),
);
