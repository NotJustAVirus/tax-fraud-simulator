import { App } from "./App.js";

export class FaxApp extends App {
    constructor(appManager) {
        super("Fax", "fax-machine.png", "fax", appManager);
    }

    onload() {
        this.forms = [];
        this.loadForms();
        this.el.find("#fax-update-button").click(() => {
            let _token = $("meta[name='csrf_token']").attr("content");
            let data = {_token: _token};
            this.el.find(".form-element").each((index, element) => {
                let id = "form_" + $(element).find(".form-send input").attr("id");
                let checked = $(element).find(".form-send input").prop("checked");
                data[id] = checked;
            });
            $.post("/fax/update", data).done(() => {
                this.loadForms();
            }).fail((err) => {
                console.log(err);
            });
        });
    }

    loadForms() {
        $.ajax({
            url: "/form/answers",
            type: "GET",
            success: (data) => {
                this.forms = data;
                this.renderForms();
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    renderForms() {
        let totalValue = 0;
        let totalSus = 0;
        this.el.find(".forms").empty();
        this.forms.forEach((form) => {
            const formElement = this.createFormElement(form.form);
            if (form.to_fax === 1) {
                formElement.find(".form-send input").prop("checked", true);
            }
            totalValue += form.form.value;
            totalSus += form.form.sus;
            this.el.find(".forms").append(formElement);
        });
        this.el.find(".total-value").text(totalValue);
        this.el.find(".total-sus").text(totalSus);
    }

    createFormElement(form) {
        let element = $(`<div class="form-element item">
            <div class="form-send">
                <input type="checkbox" name="send" id="${form.id}">
            </div>
            <div class="form-name">${form.name}</div>
            <div class="form-money">${form.value}</div>
            <div class="form-sus">${form.sus}</div>
        </div>`);
        element.find(".form-send input").change((e) => {
            const checked = e.target.checked;
            this.updateForm(form.id, checked);
        });
        return element;
    }
}
