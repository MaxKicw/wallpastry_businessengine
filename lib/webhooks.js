"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = void 0;
const _1 = require("./");
const axios_1 = __importDefault(require("axios"));
const webhookHandlers = {
    'payment_intent.succeeded': async (data) => {
        console.log("Super hat geklappt" + JSON.stringify(data.metadata));
        axios_1.default.post('https://www.wallpastry.com/orders', {
            orderid: data.id,
            email: data.receipt_email,
            name: data.shipping.name,
            adress: data.shipping.address.line1,
            city: data.shipping.address.postal_code + "/" + data.shipping.address.city,
            order: JSON.parse(data.metadata.order),
            amount: data.amount_received / 100
        })
            .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
            console.log(error);
        });
    },
    'payment_intent.payment_failed': async (data) => {
        console.log("Shit hat nicht geklappt");
    },
};
exports.handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const event = _1.stripe.webhooks.constructEvent(req['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET);
    try {
        await webhookHandlers[event.type](event.data.object);
        res.send({ received: true });
    }
    catch (err) {
        res.status(400).send("Webhook Error: " + err.message);
    }
};
//# sourceMappingURL=webhooks.js.map