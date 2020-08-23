import app from './server';
import db from './db';

db.create();

app.listen(3000, () =>
  console.info('Servidor rodando em http://localhost:3000'),
);
