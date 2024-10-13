import { App } from "./App.js";

export class TableApp extends App {
    constructor(appManager) {
        super("Table", "table.webp", "table", appManager);
    }

    onload() {
        // draw table
        this.canvas = this.el.find("canvas")[0];
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 2000;
        this.canvas.height = 2000;
        this.ctx.fillStyle = "#f0f0f0";
        this.ctx.fillRect(0, 0, 40, 2000);
        this.ctx.fillRect(0, 0, 2000, 25);
        this.ctx.fillStyle = "#555";
        for (let x = 40; x < 2000; x += 60) {
            this.ctx.fillRect(x, 0, 1, 2000);
        }
        for (let y = 25; y < 2000; y += 25) {
            this.ctx.fillRect(0, y, 2000, 1);
        }
        this.ctx.fillStyle = "#000";
        this.ctx.font = "16px Consolas";
        for (let x = 65; x < 2000; x += 60) {
            this.ctx.fillText(String.fromCharCode(65 + (x - 60) / 60), x, 15); // A-Z TODO: A-ZZ
        }
        for (let y = 45; y < 2000; y += 25) {
            this.ctx.fillText(Math.floor(y / 25), 10, y);
        }
    }
}
