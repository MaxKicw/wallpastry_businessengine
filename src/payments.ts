import {stripe} from './'

//Create Paymentintent

export async function createPaymentIntent(amount:number){
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency:'eur',
    })
    return paymentIntent;
}