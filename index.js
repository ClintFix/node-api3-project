const server = require('./api/server');
const dotenv = require('dotenv').config();
const cors = require("cors");
const port = process.env.PORT || 9000;

server.use(cors());

server.listen(port, () => {
    console.log(`Server is alive on port ${port}`)
})