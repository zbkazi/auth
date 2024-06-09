const app = require("../app");


const router = require('./routes/index')


app.use("/api", router)