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
    heights = [];
    widths = [];
    
    constructor(appManager) {
        super("Table", "table.webp", "table", appManager);
    }

    onload() {
        this.canvas = this.el.find("canvas")[0];
        this.canvas.width = 2000;
        this.canvas.height = 2000;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "16px Consolas";
        this.ctx.textBaseline = "middle";
        this.drawTable();
        this.ctx.fillStyle = "#000";
        this.writeText(0, 0, "A1");
        this.writeText(1, 1, "B2");
        this.writeNumber(0, 1, 3);
        this.ctx.font = "40px Consolas";
        this.writeNumber(0, 2, 3);
        this.writeText(2, 2, "jfpd");
    }
    
    drawTable() {
        this.ctx.fillStyle = "#f0f0f0";
        this.ctx.fillRect(0, 0, 40, 2000);
        this.ctx.fillRect(0, 0, 2000, 25);
        this.ctx.fillStyle = "#555";
        this.ctx.textAlign = "center";

        this.widths = [];
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
            this.ctx.fillText(char, x + (width / 2), 14);
            this.widths.push(x);
            x += width;
        }
        
        this.heights = [];
        let y = 25;
        for (let i = 0; y < 2000; i++) {
            this.ctx.fillRect(0, y, 2000, 1);
            let height = this.rowHeight;
            if (this.rowExceptions[i]) {
                height = this.rowExceptions[i];
            }
            this.ctx.fillText(i + 1, 20, y + (height / 2) + 2);
            this.heights.push(y);
            y += height;
        }
    }

    writeText(column, row, text) {
        this.ctx.textAlign = "left";
        this.writeCell(this.widths[column] + 5, row, text);
    }
    
    writeNumber(column, row, number) {
        this.ctx.textAlign = "right";
        this.writeCell(this.widths[column + 1] - 5, row, number);
    }

    writeCell(x, row, value) {
        let height = this.rowHeight;
        if (this.rowExceptions[row]) {
            height = this.rowExceptions[row];
        }
        this.ctx.fillText(value, x, this.heights[row] + (height / 2) + 2);
    }
}
