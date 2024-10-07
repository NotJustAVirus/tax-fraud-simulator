import { AppManager } from "./js/AppManager.js";
import { BrowserApp } from "./js/app/browser/BrowserApp.js";
import { NoteBlockApp } from "./js/app/NoteBlockApp.js";
import { FaxApp } from "./js/app/FaxApp.js";


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