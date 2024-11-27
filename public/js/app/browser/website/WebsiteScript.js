export class WebsiteScript {

    constructor(tab) {
        this.tab = tab;
    }

    start(DOM) {
        this.DOM = DOM;
        this.run();
    }

    run() {
        // generic website does nothing
    }

    stop() {
        // generic website does nothing
    }
}