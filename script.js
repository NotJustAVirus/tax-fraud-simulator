class AppManager {
    focus = null;

    constructor() {
        this.apps = [];
        $(".startmenu").click(() => this.focusApp(null));
        // $("#desktop").click(() => this.focusApp(null));
        let startmenu = new StartMenuApp();
        this.addApp(startmenu);
        let browser = new App("WaterCat", "water-cat.webp", "browser");
        browser.pin();
        this.addApp(browser);
        let fax = new App("Fax", "fax-machine.png", "fax");
        fax.pin();
        this.addApp(fax);
        let test = new App("Test", "back.png", "login");
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


const windowTmp = $.get("window.html");

class App {
    open = false;
    pinned = false;

    constructor(name, icon, link) {
        this.name = name;
        this.icon = icon;
        this.link = link;
    }

    async launch() {
        this.open = true;
        if (!this.pinned) this.createAppTaskbar();
        this.taskbar.addClass("open");
        await this.createAppWindow();
        this.el.find(".window-content").load(this.link);
    }

    async createAppWindow() {
        await windowTmp;
        this.el = $(windowTmp.responseText);
        this.el.find(".window-title").text(this.name);
        this.el.find(".window-icon img").attr("src", "/icon/" + this.icon);
        this.el.find(".close").click(() => this.close());
        this.el.find(".minimize").click((e) => {
            e.stopPropagation();
            this.el.addClass("minimized");
            appManager.focusApp(null);
        });
        this.el.appendTo("#desktop"); 
        this.el.click(() => {
            appManager.focusApp(this)
        });
    }

    createAppTaskbar() {
        this.taskbar = $(`<li class="app-button" data-app="${this.link}">
            <img src="/icon/${this.icon}" alt="${this.name}">
        </li>`);
        this.taskbar.click(() => appManager.launchApp(this.link));
        this.taskbar.appendTo("#taskbar ul");
    }

    focus(focused) {
        this.el.toggleClass("focused", focused);
        this.taskbar.toggleClass("focused", focused);
    }

    minimize(bool = true) {
        this.el.toggleClass("minimized", bool);
    }

    pin() {
        this.pinned = true;
        this.createAppTaskbar();
    }

    close() {
        appManager.focusApp(null);
        this.open = false;
        this.el.remove();
        if (!this.pinned) {
            this.taskbar.remove();
        } else {
            this.taskbar.removeClass("open");
        }
    }
}

class StartMenuApp extends App {
    constructor() {
        super("Start", "door.png", "start")
        this.open = true;
        this.el = $("");
        this.pin();
    }

    focus(focused) {
        $(".startmenu").toggleClass("hidden", !focused);
        this.taskbar.toggleClass("focused", focused);
    }
}

let appManager = new AppManager();