import { App } from "./App.js";
import { StartMenuApp } from "./StartMenuApp.js";

export class AppManager {
    focus = null;

    constructor() {
        this.apps = [];
        let startmenu = new StartMenuApp(this);
        this.addApp(startmenu);
        let browser = new App("WaterCat", "water-cat.webp", "browser", this);
        browser.pin();
        this.addApp(browser);
        let fax = new App("Fax", "fax-machine.png", "fax", this);
        fax.pin();
        this.addApp(fax);
        let test = new App("Test", "back.png", "login", this);
        this.addApp(test);
        this.launchApp("login");
    }

    addApp(app) {
        this.apps.push(app);
    }

    getApp(appLink) {
        return this.apps.find(app => app.link === appLink);
    }

    async launchApp(appLink) {
        let app = this.getApp(appLink);
        if (app) {
            // If app is not open, launch it
            if (!app.open) {
                await app.launch();
                this.focusApp(app);
                return;
            }
            // If app is open and focused, minimize it
            if (this.focus === app) {
                app.minimize();
                this.focusApp(null);
                return;
            }
            // If app is open but minimized, restore it
            app.el.appendTo("#desktop"); // Move to front
            setTimeout(() => app.minimize(false), 1);
            this.focusApp(app);
        } else {
            console.error("App not found");
        }
    }

    focusApp(app) {
        if (this.focus === app) return;
        if (this.focus) {
            this.focus.focus(false);
        }
        this.focus = app;
        if (this.focus) {
            this.focus.focus(true);
        }
    }
}
