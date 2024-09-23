import { App } from "./App.js";

export class StartMenuApp extends App {
    constructor(appManager) {
        super("Start", "door.png", "start", appManager);
        this.open = true;
        this.el = $("");
        this.pin();
    }

    focus(focused) {
        $(".startmenu").toggleClass("hidden", !focused);
        this.taskbar.toggleClass("focused", focused);
    }
}
