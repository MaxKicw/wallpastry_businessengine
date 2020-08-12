import {stripe} from './'

//Create Paymentintent


export async function createPaymentIntent(amount:number,metadata:string){
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency:'eur',
        metadata:{order:metadata},
    })
    return paymentIntent;
}