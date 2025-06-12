import { WebsiteScript } from './WebsiteScript.js';

export class FraudHub extends WebsiteScript {
    loadingElement = $(`<img src="/image/working.webp" alt="Loading screen" class="loading-img">`);

    run() {
        $.get("/form").done((forms) => {
            this.forms = [];
            for (let form of forms) {
                let formObj = new Form(form, this);
                this.forms.push(formObj);
            }
            this.displayForms();
        });
    }

    displayForms() {
        let nav = this.DOM.find("nav");
        nav.empty();
        for (let form of this.forms) {
            let formNavButton = form.createFormNavButton();
            nav.append(formNavButton);
        }
        this.openForm(this.forms[0]);
    }

    openForm(form) {
        this.DOM.find("section").empty();
        if (form.answered) {
            let div = $(`<div>This form has already been filled out.</div>`);
            this.DOM.find("section").append(div);
        } else {
            this.DOM.find("section").append(this.loadingElement);
            $.get(`/form/${form.id}`).done((form_data) => {
                this.DOM.find("section").empty();
                form.loadFields(form_data.fields);
                let formDiv = form.createFormDiv();
                this.DOM.find("section").append(formDiv);
            });
        }
    }
}

class Form {
    constructor(obj, hub) {
        this.hub = hub;
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.image = obj.image;
        this.sus = obj.sus;
        this.value = obj.value;
        this.answered = obj.answers.length > 0;
    }

    loadFields(fields) {
        this.fields = [];
        for (let field of fields) {
            this.fields.push(new Field(field));
        }
    }

    createFormNavButton() {
        let imgSrc = this.image ? this.image : "/image/icon/battery.png";
        this.navButton = $(`<button class="form-nav">
            <div class="icon">
                <img src="/image/icon/check.png" alt="Check icon" class="overlay-icon">
                <img src="${imgSrc}" alt="Form icon" class="form-icon">
            </div>
            <div class="info">
            </div>
        </button>`);
        if (!this.answered) {
            this.navButton.find(".icon img.overlay-icon").addClass("hidden");
        }
        let info = this.navButton.find(".info");
        info.append(`<div class="name">${this.name}</div>`);
        if (this.description) {
            info.append(`<div class="description">${this.description}</div>`);
        }
        if (this.sus) {
            info.append(`<div class="sus">${this.sus}</div>`);
        }
        if (this.value) {
            info.append(`<div class="money">$${this.value}</div>`);
        }
        this.navButton.click(() => {
            this.hub.openForm(this);
        });
        return this.navButton;
    }

    createFormDiv() {
        this.div = $(`<form class="form" method="post">
            <h2>${this.name}</h2>
            <div class="description">${this.description}</div>
        </form>`);
        let csrfToken = $(`<input type="hidden" name="_token" value="${$("meta[name='csrf_token']").attr("content")}">`);
        this.div.append(csrfToken);
        for (let field of this.fields) {
            let fieldDiv = field.createFieldDiv();
            this.div.append(fieldDiv);
        }
        let submitButton = $(`<input type="submit" value="Submit">`);
        this.div.submit((event) => {
            event.preventDefault();
            this.submit().then((success) => {
                if (success) {
                    this.answered = true;
                    this.navButton.find(".icon img.overlay-icon").removeClass("hidden");
                    this.hub.openForm(this);
                }
            });
        });
        this.div.append(submitButton);
        return this.div;
    }

    async submit() {
        return new Promise((resolve, reject) => {
            $.post(`/form/${this.id}`, this.div.serialize()).done((response) => {
                if (response === "ok") {
                    resolve(true);
                } else {
                    reject(false);
                }
            }).fail(() => {
                reject(false);
            });
        });
    }
}

class Field {
    constructor(obj) {
        this.id = obj.id;
        this.order = obj.pivot.order;
        this.required = obj.pivot.required;
        this.type = obj.type.name;
        this.name = obj.name;
        this.description = obj.description;
        this.placeholder = obj.placeholder;
        this.options = [];
        for (let option of obj.options) {
            this.options.push(option.value);
        }
    }

    createFieldDiv() {
        let fieldDiv = $(`<div class="field">
            <label>${this.name}:</label>
        </div>`);
        if (this.description) {
            fieldDiv.find("label").attr("title", this.description);
        }
        let input;
        switch (this.type) {
            case "textarea":
                input = $(`<textarea></textarea>`);
                if (this.placeholder) {
                    input.attr("placeholder", this.placeholder);
                }
                break;
            case "select":
                input = $(`<select></select>`);
                for (let option of this.options) {
                    let optionElement = $(`<option value="${option}">${option}</option>`);
                    if (this.placeholder && this.placeholder === option) {
                        optionElement.attr("selected", "selected");
                    }
                    input.append(optionElement);
                }
                break;
            case "radio":
                for (let option of this.options) {
                    let radio = $(`<input type="radio" name="field_${this.id}" value="${option}" id="${option}">`);
                    let label = $(`<label for="${option}">${option}</label>`);
                    if (this.placeholder && this.placeholder === option) {
                        radio.attr("checked", "checked");
                    }
                    fieldDiv.append(radio);
                    fieldDiv.append(label);
                }
                input = fieldDiv;
                break;
            default:
                input = $(`<input type="${this.type}">`);
                if (this.placeholder) {
                    input.attr("placeholder", this.placeholder);
                }
                break;
        }
        input.attr("required", this.required);
        input.attr("name", "field_" + this.id);
        fieldDiv.append(input);
        this.input = input;
        return fieldDiv;
    }
}