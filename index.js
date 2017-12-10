const express = require('express');
const routerApi = require('./routerApi');
const logMiddleware = require('./logMiddleware');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser());
app.use(logMiddleware(['GET', 'PUT']));
app.use('/', routerApi);

app.listen(3000);
