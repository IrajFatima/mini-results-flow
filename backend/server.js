require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = require("./app");

app.get("/", (req, res) => {
    return res.send("server is running");
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})