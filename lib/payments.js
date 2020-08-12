"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const _1 = require("./");
//Create Paymentintent
async function createPaymentIntent(amount, metadata) {
    const paymentIntent = await _1.stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        metadata: JSON.parse(metadata),
    });
    return paymentIntent;
}
exports.createPaymentIntent = createPaymentIntent;
//# sourceMappingURL=payments.js.map