import { NewTab } from "./website/NewTab.js";

export class Tab {
    constructor(browserApp) {
        this.browserApp = browserApp;
        let icon = "water-cat.webp";
        let title = "New Tab";
        this.topbarTab = $(`<li class="site">
            <img src="/icon/${icon}" alt="site icon" class="siteicon">
            <span>${title}</span>
            <div class="siteclose">
                <img src="/icon/close.webp" alt="close icon" class="sitecloseicon">
            </div>
        </li>`);
        this.navigate({ title: "New Tab", url: "", path: "newtab", icon: "water-cat.webp", script: NewTab });
    }
    
    async navigate(website) {
        let page = website ? website.path : "newtab";
        let site = await $.get("browser/website/" + page + ".html");
        this.topbarTab.find("span").text(website.title);
        this.topbarTab.find(".siteicon").attr("src", "/icon/" + website.icon);
        this.browserApp.appManager.addStyle("browser/website/" + page + ".css");
        this.window = $('<div class="website"></div>');
        this.window.addClass(page);
        $(site).appendTo(this.window);
        this.open();
        new website.script(this).start(this.window);
    }

    open() {
        $("#site").empty();
        $("#site").append(this.window);
    }

    close() {
        this.topbarTab.remove();
    }
}