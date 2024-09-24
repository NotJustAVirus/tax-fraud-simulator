import { App } from "./App.js";

export class BrowserApp extends App {
    constructor(appManager) {
        super("WaterCat", "water-cat.webp", "browser", appManager);
    }
}
