import { AppManager } from "./AppManager.js";
import { BrowserApp } from "./app/browser/BrowserApp.js";
import { NoteBlockApp } from "./app/NoteBlockApp.js";
import { FaxApp } from "./app/FaxApp.js";


let appManager = new AppManager();

let apps = [
    BrowserApp,
    NoteBlockApp,
    FaxApp,
];

appManager.loadApps(apps);

appManager.getApp("browser").pin();
appManager.getApp("browser").launch();
appManager.getApp("fax").pin();