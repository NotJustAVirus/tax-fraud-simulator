import { Darkweb } from './website/Darkweb.js';
import { WebsiteScript } from './website/WebsiteScript.js';

export class VirtualDNS {
    static websites = [
        { title: "Darkweb", url: "dark.web", path: "darkweb", icon: "incognito.png", script: Darkweb},
        { title: "Tax", url: "taxes.gov", path: "taxform", icon: "mail.png", script: WebsiteScript},
        { title: "Fraud hub", url: "commit-fraud.now", path: "fraudHub", icon: "forward.png", script: WebsiteScript},
    ];

    static lookup(domain) {
        let website = this.websites.find(website => website.url === domain);
        if (website) {
            return website;
        }
        return null;
    }
}
