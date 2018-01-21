const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const config = require('./commons/conf');
const database = require('./commons/db');

app.set('json spaces', 2);
// converte o conteudo para um json
app.use(bodyParse.json());
// converte as url
app.use(bodyParse.urlencoded({ 
    extended: false
}));

database.connect(config.get('MONGO_URL'), (err) => {
  if (err) {
    console.log('Desligue o aplicativo porque ocorreu um erro ' +
      'ao se conectar a database');
    process.exit(1);
  }
});

// Carrega os Models
const Order = require('./models/schema/order');
const Product = require('./models/schema/products-schema.json');
const Customer = require('./models/schema/customers-schema.json');

// arquivos de rotas
const routeIndex = require('./routes/index-route');
const routeProduct = require('./routes/products-route');

app.use('/', routeIndex);
app.use('/products', routeProduct);

module.exports = app;
