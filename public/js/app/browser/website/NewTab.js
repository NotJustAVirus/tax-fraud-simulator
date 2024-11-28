import { VirtualDNS } from '../VirtualDNS.js';
import { WebsiteScript } from './WebsiteScript.js';

export class NewTab extends WebsiteScript {
    
    run() {
        for (let i = 0; i < VirtualDNS.websites.length; i++) {
            let website = VirtualDNS.websites[i];
            let box = $(`<button type="button" class="website-box">
                <img src="/image/icon/close.webp" alt="website logo">
                <p>Website</p>
            </button>`);
            box.find("img").attr("src", "image/icon/" + website.icon);
            box.find("p").text(website.title);
            this.DOM.find(".options").append(box);
            box.click(() => {
                this.tab.navigate(website);
            });
        }
    }
}