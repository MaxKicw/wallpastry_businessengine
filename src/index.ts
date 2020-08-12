//RUN npm run dev FOR HOT RELOADING 

//Env Vars (Stripe API Secret)
import {config} from "dotenv"
if(process.env.NODE_ENV !== "production"){
    config();
}
//Init Stripe
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET,{
    apiVersion:"2020-03-02",
});

//Start API with Express
import {app} from "./api";
const port = process.env.PORT || 3333;
app.listen(port,()=>console.log("API verfügbar auf Port "+port)) 
