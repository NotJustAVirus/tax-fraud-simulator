$(".startmenu-button").click(function() {
    $(".startmenu").toggleClass("hidden");
});

$(".app-button").click(function() {
});



class AppManager {
    constructor() {
        this.apps = [];
        this.addApp(new App("Browser", "water-cat.webp", "browser"));
    }

    addApp(app) {
        this.apps.push(app);
    }

    removeApp(app) {
        this.apps.splice(this.apps.indexOf(app), 1);
    }

    getApp(appName) {
        return this.apps.find(app => app.name === appName);
    }

    launchApp(appName) {
        let app = this.getApp(appName);
        if (app) {
            window.open(app.link);
        }
    }

}

class App {
    constructor(name, icon, link) {
        this.name = name;
        this.icon = icon;
        this.link = link;
    }
}