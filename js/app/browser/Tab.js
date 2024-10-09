import { NewTab } from "./website/NewTab.js";

export class Tab {
    history = [];
    historyIndex = -1;

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
        if (website == null) {
            console.error("Website not found");
            return;
        }
        if (this.history[this.historyIndex] == website) {
            this.refresh();
            return;
        }
        if (this.history.length - 1 > this.historyIndex) {
            this.history.splice(this.historyIndex + 1, this.history.length - this.historyIndex);
        }
        this.website = website;
        this.history.push(website);
        this.historyIndex++;
        this.goToWebsite(this.historyIndex);
    }
    
    async goToWebsite(historyIndex) {
        this.website = this.history[historyIndex];
        let page = this.website.path ? this.website.path : "newtab";
        let site = await $.get("browser/website/" + page + ".html");
        this.topbarTab.find("span").text(this.website.title);
        this.topbarTab.find(".siteicon").attr("src", "/icon/" + this.website.icon);
        this.browserApp.appManager.addStyle("browser/website/" + page + ".css");
        if (this.window) {
            this.window.remove();
        }
        this.window = $('<div class="website"></div>');
        this.window.addClass(page);
        $(site).appendTo(this.window);
        this.open();
        new this.website.script(this).start(this.window);
    }

    back() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.goToWebsite(this.historyIndex);
        }
    }

    forward() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.goToWebsite(this.historyIndex);
        }
    }

    refresh() {
        this.goToWebsite(this.historyIndex);
    }

    open() {
        $("#site").append(this.window);
        if (this.website != undefined) {
            this.browserApp.setURL(this.website.url);
        }
    }

    close() {
        this.topbarTab.remove();
        this.window.remove();
    }
}