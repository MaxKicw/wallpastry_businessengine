import express, { Request, Response } from "express";
export const app = express();
import cors from 'cors';
import {createPaymentIntent} from './payments';
import { handleStripeWebhook } from "./webhooks";

app.use(
    express.json({
      verify: (req, res, buffer) => (req['rawBody'] = buffer),
    })
  );
  
app.use(cors({origin:true}))

function runAsync(callback: Function) {
    return (req: Request, res: Response) => {
      callback(req, res).catch();
    };
  }

app.post(
    '/payments',
    runAsync (async ({ body }: Request, res: Response) => {
      res.send(
        await createPaymentIntent(body.amount,body.metadata),
      );
    })
)

app.post("/test",(req:Request,res:Response)=> {
    const amount = req.body.amount;
    console.log("/test request")
    res.status(200).send({with_tax:amount+7});
})

app.get('/hi', (req, res) => {
  res.send('Hello World!')
})

app.post('/hooks',runAsync (handleStripeWebhook))


//Paymentintent



