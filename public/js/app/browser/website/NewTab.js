import { VirtualDNS } from '../VirtualDNS.js';
import { WebsiteScript } from './WebsiteScript.js';

export class NewTab extends WebsiteScript {
    
    run() {
        let boxes = this.DOM.find(".website-box");
        for (let i = 0; i < boxes.length; i++) {
            let element = $(boxes[i]);
            element.click(() => {
                let website = VirtualDNS.lookup(element.data("page"));
                this.tab.navigate(website);
            });
        }
    }
}