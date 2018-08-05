const bodyParse = require('body-parser');
const express = require('express');

const app = express();
const config = require('./commons/conf');
const database = require('./commons/db');

app.set('json spaces', 2);

/* converte o conteudo para um json */
app.use(bodyParse.json());

/* converte as url */ 
app.use(bodyParse.urlencoded({
  extended: false,
}));

database.connect(config.get('MONGO_URL'), (err) => {
  if (err) {
    console.log('Desligue o aplicativo porque ocorreu um erro ao se conectar a database');
    process.exit(1);
  }
});

/* arquivos de rotas */
const routeIndex = require('./routes/index-route');
const routeProduct = require('./routes/products-route');
const routeCustomer = require('./routes/customer-route');
const routeOrder = require('./routes/order-route');

app.use('/', routeIndex);
app.use('/products', routeProduct);
app.use('/customers', routeCustomer);
app.use('/orders', routeOrder);

module.exports = app;
