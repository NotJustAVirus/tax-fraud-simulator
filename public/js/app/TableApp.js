import { App } from "./App.js";

export class TableApp extends App {
    columnWidth = 60;
    rowHeight = 25;
    columnExceptions = {
        2: 100,
    };
    rowExceptions = {
        2: 50,
    };
    
    constructor(appManager) {
        super("Table", "table.webp", "table", appManager);
    }

    onload() {
        this.canvas = this.el.find("canvas")[0];
        this.canvas.width = 2000;
        this.canvas.height = 2000;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "16px Consolas";
        this.drawTable();
        this.writeCell(0, 0, "A1");
    }
    
    drawTable() {
        this.ctx.fillStyle = "#f0f0f0";
        this.ctx.fillRect(0, 0, 40, 2000);
        this.ctx.fillRect(0, 0, 2000, 25);
        this.ctx.fillStyle = "#555";
        this.ctx.textAlign = "center";
        let x = 40;
        for (let i = 0; x < 2000; i++) {
            this.ctx.fillRect(x, 0, 1, 2000);
            let width = this.columnWidth;
            if (this.columnExceptions[i]) {
                width = this.columnExceptions[i];
            }
            let char = "";
            if (i >= 26) char += String.fromCharCode(65 + (i / 26) - 1);
            char += String.fromCharCode(65 + (i % 26));
            this.ctx.fillText(char, x + (width / 2), 17);
            x += width;
        }
        
        let y = 25;
        for (let i = 0; y < 2000; i++) {
            this.ctx.fillRect(0, y, 2000, 1);
            let height = this.rowHeight;
            if (this.rowExceptions[i]) {
                height = this.rowExceptions[i];
            }
            this.ctx.fillText(i + 1, 20, y + (height / 2) + 5);
            y += height;
        }
    }

    writeCell(x, y, value) {
        this.ctx.fillText(value, 65 + x * 60, 45 + y * 25);
    }
}
