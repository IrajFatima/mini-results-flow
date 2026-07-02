const express = require('express');
const cors = require('cors');

const formRoutes = require('./routes/formRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/form', formRoutes);
app.use('/api/result', resultRoutes);

module.exports = app;
