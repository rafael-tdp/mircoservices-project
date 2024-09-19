import express from "express";
import routes from './routes/index.js';

const app = express();
const PORT = 3000

app.use(express.json())
app.use('/', routes)

app.listen(PORT, () =>{
    console.log("Gateway has started on port", PORT)
})