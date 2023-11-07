import express, { type Response, type Request } from "express";
import bodyParser from 'body-parser'

const app = express()


app.use(express.json());

app.get("/", (req: Request, res : Response ) => {
  res.send("Healthy");
});

const PORT = 3001;

app.listen(PORT, () => console.log('server is running at :', 3001))