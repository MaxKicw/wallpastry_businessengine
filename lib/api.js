"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const payments_1 = require("./payments");
const webhooks_1 = require("./webhooks");
exports.app.use(express_1.default.json({
    verify: (req, res, buffer) => (req['rawBody'] = buffer),
}));
exports.app.use(cors_1.default({ origin: true }));
function runAsync(callback) {
    return (req, res) => {
        callback(req, res).catch();
    };
}
exports.app.post('/payments', runAsync(async ({ body }, res) => {
    res.send(await payments_1.createPaymentIntent(body.amount));
}));
exports.app.post("/test", (req, res) => {
    const amount = req.body.amount;
    res.status(200).send({ with_tax: amount + 7 });
});
exports.app.get('/hi', (req, res) => {
    res.send('Hello World!');
});
exports.app.post('/hooks', runAsync(webhooks_1.handleStripeWebhook));
//Paymentintent
//# sourceMappingURL=api.js.map