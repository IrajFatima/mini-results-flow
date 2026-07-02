const express = require('express');
const cors = require('cors');
require('dotenv').config();

const formRoutes = require('./routes/formRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/form', formRoutes);
app.use('/api/result', resultRoutes);

app.get("/", (req, res) => {
    return res.send("server is running");
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})