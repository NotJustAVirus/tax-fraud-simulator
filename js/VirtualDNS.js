export class VirtualDNS {
    websites = [];
    constructor() {
        this.websites = [
            { title: "Darkweb", url: "dark.web", path: "darkweb", icon: "darkweb.png" },
            { title: "Tax", url: "taxes.gov", path: "taxform", icon: "taxes.png" },
        ];
    }

    lookup(domain) {
        let website = this.websites.find(website => website.url === domain);
        if (website) {
            return website;
        }
        return null;
    }
}
