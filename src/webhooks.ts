import {stripe} from './'
import Stripe from 'stripe';
import axios from 'axios';


const webhookHandlers = {

    'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
      console.log("Super hat geklappt"+JSON.stringify(data.metadata));
      axios.post('https://www.wallpastry.com/orders', {
        orderid:data.id,
        email:data.receipt_email,
        name: data.shipping.name,
        adress:data.shipping.address.line1,
        city:data.shipping.address.postal_code+"/"+data.shipping.address.city,
        order:JSON.parse(data.metadata.order),
        amount:data.amount_received/100
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    'payment_intent.payment_failed': async (data: Stripe.PaymentIntent) => {
        console.log("Shit hat nicht geklappt")
    },
}

export const handleStripeWebhook = async(req,res) => {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req['rawBody'],sig,process.env.STRIPE_WEBHOOK_SECRET);

    try {
        await webhookHandlers[event.type](event.data.object);
        res.send({received:true})
    } catch (err) {
        res.status(400).send("Webhook Error: "+err.message);
    }
}