const windowTmp = $.get("/html/window.html");

export class App { // abstract
    open = false;
    pinned = false;

    constructor(name, icon, link, appManager) {
        this.name = name;
        this.icon = icon;
        this.link = link;
        this.appManager = appManager;
        this.createAppStartMenu();
    }

    async launch() {
        this.appManager.addStyle("css/app/" + this.link + ".css");
        this.open = true;
        if (!this.pinned) this.createAppTaskbar();
        this.taskbar.addClass("open");
        await this.createAppWindow();
        this.el.find(".window-content").load("html/app/" + this.link + ".html", () => {
            this.el.find(".window-content").ready(() => {
                if (this.onload) this.onload();
            });
        });
    }

    async createAppWindow() {
        await windowTmp;
        this.el = $(windowTmp.responseText);
        this.el.attr("id", this.link);
        this.el.find(".window-title").text(this.name);
        this.el.find(".window-icon img").attr("src", "/image/icon/" + this.icon);
        this.el.find(".close").click(() => this.close());
        this.el.find(".minimize").click((e) => {
            e.stopPropagation();
            this.el.addClass("minimized");
            this.appManager.focusApp(null);
        });
        this.el.appendTo("#desktop");
        this.el.click(() => {
            this.appManager.focusApp(this);
        });
    }

    async createAppTaskbar() {
        this.taskbar = $(`<li class="app-button" data-app="${this.link}">
            <button>
                <img src="/image/icon/${this.icon}" alt="${this.name}">
            </button>
        </li>`);
        this.taskbar.click(() => this.appManager.launchApp(this.link));
        this.taskbar.appendTo("#taskbar ul");
    }

    async createAppStartMenu() {
        this.startMenu = $(
            `<button class="startmenuitem" data-app="${this.link}">
                <img src="/image/icon/${this.icon}" alt="${this.name}">
                <p>${this.name}</p>
            </button>`
        );
        this.startMenu.click(() => this.appManager.launchApp(this.link));
        this.startMenu.appendTo(".startmenucontent .grid");
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
        this.appManager.focusApp(null);
        this.open = false;
        this.el.remove();
        if (!this.pinned) {
            this.taskbar.remove();
        } else {
            this.taskbar.removeClass("open");
        }
    }
}