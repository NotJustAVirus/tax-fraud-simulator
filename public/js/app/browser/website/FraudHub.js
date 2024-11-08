import { WebsiteScript } from './WebsiteScript.js';

export class FraudHub extends WebsiteScript {
    

    run() {
        $.get("/form").done((forms) => {
            this.forms = forms;
            this.displayForms();
        });
    }

    displayForms() {
        let nav = this.DOM.find("nav");
        for (let form of this.forms) {
            let formNavButton = this.createFormNavButton(form);
            nav.append(formNavButton);
        }
    }

    createFormNavButton(form) {
        let imgSrc = form.image ? form.image : "/image/icon/battery.png";
        let formNavButton = $(`<button class="form-nav">
            <img src="/image/icon/battery.png" alt="Form icon">
            <div class="info">
            </div>
        </button>`);
        formNavButton.find("img").attr("src", imgSrc);
        let info = formNavButton.find(".info");
        info.append(`<div class="name">${form.name}</div>`);
        if (form.description) {
            info.append(`<div class="description">${form.description}</div>`);
        }
        if (form.sus) {
            info.append(`<div class="sus">${form.sus}</div>`);
        }
        if (form.value) {
            info.append(`<div class="money">$${form.value}</div>`);
        }
        formNavButton.click(() => {
            this.openForm(form);
        });
        return formNavButton;
    }

    openForm(form) {
        throw new Error("Not implemented");
    }
}