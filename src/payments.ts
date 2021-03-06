import {stripe} from './'

//Create Paymentintent

export async function createPaymentIntent(amount:number,metadata){
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency:'eur',
        metadata,
    })
    return paymentIntent;
}