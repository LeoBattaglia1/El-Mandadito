"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
// back/src/index.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
