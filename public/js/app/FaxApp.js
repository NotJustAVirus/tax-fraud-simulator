import { App } from "./App.js";

export class FaxApp extends App {
    constructor(appManager) {
        super("Fax", "fax-machine.png", "fax", appManager);
    }
}
