"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = void 0;
const _1 = require("./");
const webhookHandlers = {
    'payment_intent.succeeded': async (data) => {
        console.log("Super hat geklappt" + data.object);
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