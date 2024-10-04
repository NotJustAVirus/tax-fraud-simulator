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
        this.navigate("newtab");
    }
    
    async navigate(page) {
        let site = await $.get("browser/website/" + page + ".html");
        this.browserApp.appManager.addStyle("browser/website/" + page + ".css")
        this.window = $('<div class="website"></div>');
        this.window.addClass(page);
        $(site).appendTo(this.window);
        $("#site").empty();
        $("#site").append(this.window);
    }

    close() {
        this.topbarTab.remove();
    }
}