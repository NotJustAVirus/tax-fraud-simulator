$(".startmenu-button").click(function() {
    $(".startmenu").toggleClass("hidden");
});


$(".app-button").click(function() {
    let appLink = $(this).data("app");
    appManager.launchApp(appLink);
});



class AppManager {
    focus = null;

    constructor() {
        this.apps = [];
        this.addApp(new App("WaterCat", "water-cat.webp", "browser"));
        this.addApp(new App("Fax", "fax-machine.png", "fax"));
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
                this.focus = app;
                return;
            }
            // If app is open and focused, minimize it
            if (this.focus === app) {
                app.el.toggleClass("minimized");
                this.focus = null;
                return;
            }
            // If app is open but not focused, focus it
            app.el.appendTo("#desktop");
            setTimeout(() => app.el.removeClass("minimized"), 1);
            // app.el.removeClass("minimized");
            this.focus = app;
        } else {
            console.error("App not found");
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
        this.createAppWindow();
        if (!this.pinned) this.createAppTaskbar();
        this.el.find(".window-content").load(this.link);
    }

    createAppWindow() {
        this.el = $(windowTmp.responseText);
        this.el.find(".window-title").text(this.name);
        this.el.find(".window-icon img").attr("src", "/icon/" + this.icon);
        this.el.find(".close").click(() => this.close());
        this.el.find(".minimize").click(() => this.el.toggleClass("minimized"));
        this.el.appendTo("#desktop"); 
    }

    createAppTaskbar() {
        this.taskbar = $(`<li class="app-button" data-app="${this.link}">
            <img src="/icon/${this.icon}" alt="${this.name}">
        </li>`);
        this.taskbar.click(() => appManager.launchApp(this.link));
        this.taskbar.appendTo("#taskbar ul");
    }

    pin() {
        this.pinned = true;
        this.createAppTaskbar();
    }

    close() {
        this.open = false;
        this.el.remove();
        if (!this.pinned) {
            this.taskbar.remove();
        }
    }
}
let appManager = new AppManager();