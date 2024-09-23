const windowTmp = $.get("window.html");

export class App {
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
            this.appManager.focusApp(null);
        });
        this.el.appendTo("#desktop");
        this.el.click(() => {
            this.appManager.focusApp(this);
        });
    }

    async createAppTaskbar() {
        this.taskbar = $(`<li class="app-button" data-app="${this.link}">
            <img src="/icon/${this.icon}" alt="${this.name}">
        </li>`);
        this.taskbar.click(() => this.appManager.launchApp(this.link));
        this.taskbar.appendTo("#taskbar ul");
    }

    async createAppStartMenu() {
        this.startMenu = $(
            `<div class="startmenuitem" data-app="${this.link}">
                <img src="icon/${this.icon}" alt="${this.name}">
                <p>${this.name}</p>
            </div>`
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