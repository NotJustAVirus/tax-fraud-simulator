import { App } from "./App.js";

export class TableApp extends App {
    columnWidth = 60;
    rowHeight = 25;
    columnExceptions = {
        2: 150,
    };
    rowExceptions = {
        2: 50,
    };
    heights = [];
    widths = [];
    incomes = {
        "Freelance": 500,
        "Job": 1000,
    }
    expenses = {
        "Rent": 1000,
        "Utilities": 200,
    }
    
    constructor(appManager) {
        super("Table", "table.webp", "table", appManager);
    }

    onload() {
        this.canvas = this.el.find("canvas")[0];
        this.canvas.width = 2000;
        this.canvas.height = 2000;
        this.ctx = this.canvas.getContext("2d");
        this.updateAccounts();
    }
    
    draw() {
        this.drawTable();
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "#000";
        this.ctx.font = "36px Consolas";
        this.writeText(2, 2, "Finances");
        this.ctx.font = "16px Consolas";
        this.writeMoney();
    }

    writeMoney() {
        let column = 2;
        let row = 3;
        let totalIncome = this.listItems("Income", this.incomes, column, row);
        row += Object.keys(this.incomes).length + 1;
        this.writeText(column, row, "Total Income");
        this.writeNumber(column + 1, row, totalIncome);
        row += 2;
        let totalExpenses = this.listItems("Expenses", this.expenses, column, row);
        row += Object.keys(this.expenses).length + 1;
        this.writeText(column, row, "Total Expenses");
        this.writeNumber(column + 1, row, totalExpenses);
        row += 2;

        this.writeText(column, row, "Profit");
        let profit = totalIncome - totalExpenses;
        this.writeNumber(column + 1, row, profit);
    }

    listItems(title, items, column, row) {
        this.writeText(column, row, title);
        row++;
        let total = 0;
        for (let key in items) {
            this.writeText(column, row, key);
            this.writeNumber(column + 1, row, items[key]);
            total += items[key];
            row++;
        }
        return total;
    }
    
    drawTable() {
        this.ctx.fillStyle = "#f0f0f0";
        this.ctx.fillRect(0, 0, 40, this.canvas.height);
        this.ctx.fillRect(0, 0, this.canvas.width, 25);
        this.ctx.fillStyle = "#555";
        this.ctx.textAlign = "center";

        this.widths = [];
        let x = 40;
        for (let i = 0; x < this.canvas.width; i++) {
            this.ctx.fillRect(x, 0, 1, this.canvas.height);
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
        for (let i = 0; y < this.canvas.height; i++) {
            this.ctx.fillRect(0, y, this.canvas.width, 1);
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

    updateAccounts() {
        $.get("finance", (data) => {
            this.incomes = data.income;
            this.expenses = data.expense;
            this.draw();
        });
    }
}
