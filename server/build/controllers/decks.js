"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Deck_1 = __importDefault(require("../models/Deck"));
const decksRouter = (0, express_1.Router)();
decksRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decks = yield Deck_1.default.find({});
    res.json(decks);
}));
decksRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(req.body);
    const newDeck = new Deck_1.default({
        title: body.title
    });
    const createdDeck = yield newDeck.save();
    res.json(createdDeck);
}));
decksRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deck = yield Deck_1.default.findByIdAndDelete(id);
    res.json(deck);
}));
exports.default = decksRouter;
