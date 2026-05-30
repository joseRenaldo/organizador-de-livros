const express = require("express");
const app = express();


import conexao from './app/database/conexao.js';
import routes from './routes.js'


app.use(express.json());


app.use(routes)

export default app

