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
const cardsRouter = (0, express_1.Router)();
cardsRouter.get('/:deckId/cards', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deckId } = req.params;
    const deck = yield Deck_1.default.findById(deckId);
    if (!deck)
        return res.status(404).json({ "error": "deck do not exists" });
    res.json(deck);
}));
cardsRouter.post('/:deckId/cards', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deckId = req.params.deckId;
    try {
        const deck = yield Deck_1.default.findById(deckId);
        const { text } = req.body;
        if (!deck)
            return res.status(404).json({ "error": "deck do not exists" });
        deck.cards.push(text);
        yield deck.save();
        res.json(deck);
    }
    catch (_a) {
        res.status(400).json({ "error": "invalid id" });
    }
}));
cardsRouter.delete('/:deckId/cards/:index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deckId, index } = req.params;
        const deck = yield Deck_1.default.findById(deckId);
        if (!deck)
            return res.status(404).json({ "error": "deck do not exists" });
        deck.cards.splice(Number(index), 1);
        yield deck.save();
        res.json(deck);
    }
    catch (_b) {
        res.status(400).json({ "error": "invalid id" });
    }
}));
exports.default = cardsRouter;
