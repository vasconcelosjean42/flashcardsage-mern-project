"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const decks_1 = __importDefault(require("./controllers/decks"));
const cards_1 = __importDefault(require("./controllers/cards"));
const PORT = 5001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use('/decks', decks_1.default);
app.use('/decks', cards_1.default);
const db = mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
    console.log(`litening to the port ${PORT}`);
    app.listen(PORT);
}).catch(e => {
    console.log("error: " + e);
});
