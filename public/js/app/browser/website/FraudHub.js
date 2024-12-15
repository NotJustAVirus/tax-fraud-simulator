import { WebsiteScript } from './WebsiteScript.js';

export class FraudHub extends WebsiteScript {
    loadingElement = $(`<img src="/image/working.webp" alt="Loading screen" class="loading-img">`);

    run() {
        $.get("/form").done((forms) => {
            this.forms = forms;
            this.displayForms();
        });
    }

    displayForms() {
        let nav = this.DOM.find("nav");
        nav.empty();
        for (let form of this.forms) {
            let formNavButton = this.createFormNavButton(form);
            nav.append(formNavButton);
        }
        this.openForm(this.forms[0]);
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
        this.DOM.find("section").empty();
        this.DOM.find("section").append(this.loadingElement);
        $.get(`/form/${form.id}`).done((form) => {
            this.displayForm(new Form(form));
        });
    }

    displayForm(form) {
        let formDiv = $(`<form class="form" method="post">
            <h2>${form.name}</h2>
            <div class="description">${form.description}</div>
        </form>`);
        let csrfToken = $(`<input type="hidden" name="_token" value="${$("meta[name='csrf_token']").attr("content")}">`);
        formDiv.append(csrfToken);
        for (let field of form.fields) {
            let fieldDiv = field.createFieldDiv();
            formDiv.append(fieldDiv);
        }
        let submitButton = $(`<input type="submit" value="Submit">`);
        formDiv.submit((event) => {
            event.preventDefault();
            form.submit();
        });
        formDiv.append(submitButton);
        form.div = formDiv;
        this.DOM.find("section").empty();
        this.DOM.find("section").append(formDiv);
    }
}

class Form {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.image = obj.image;
        this.sus = obj.sus;
        this.value = obj.value;
        this.fields = [];
        for (let field of obj.fields) {
            this.fields.push(new Field(field));
        }
    }

    submit() {
        $.post(`/form/${this.id}`, this.div.serialize()).done((response) => {
            console.log(response);
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