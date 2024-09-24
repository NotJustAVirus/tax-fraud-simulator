import { AppManager } from "./js/AppManager.js";
import { BrowserApp } from "./js/BrowserApp.js";
import { NoteBlockApp } from "./js/NoteBlockApp.js";
import { FaxApp } from "./js/FaxApp.js";


let appManager = new AppManager();

let apps = [
    BrowserApp,
    NoteBlockApp,
    FaxApp,
];

appManager.loadApps(apps);

appManager.getApp("browser").pin();
appManager.getApp("fax").pin();