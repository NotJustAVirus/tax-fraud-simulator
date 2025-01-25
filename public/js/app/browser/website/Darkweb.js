import { GameMaster } from '../../../GameMaster.js';
import { WebsiteScript } from './WebsiteScript.js';

export class Darkweb extends WebsiteScript {

    run() {
        $.get("/darkweb").done((items) => {
            this.loadProducts(items);
        });
        GameMaster.getInstance().addCallback(this.updateGameState.bind(this));
        this.updateGameState(GameMaster.getInstance().getGameState());
    }

    stop() {
        GameMaster.getInstance().removeCallback(this.updateGameState);
    }

    updateGameState(gameState) {
        this.DOM.find(".money").text("$" + gameState.money);
        this.DOM.find(".sus").text(gameState.sus + "ඞ");
    }

    loadProducts(items) {
        this.products = [];
        for (let item of items) {
            let product = new Product(item);
            this.products.push(product);
        }
        let grid = this.DOM.find(".productgrid");
        grid.empty();
        for (let product of this.products) {
            grid.append(product.DOM);
        }
    }
}

class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.sus = data.sus;
        this.image = data.image ? data.image : "icon/battery.png"; // TODO: Change to meaningful default image

        // this.level_criteria = data.level_criteria;
        // this.modifier = data.modifier;

        this.DOM = $(`<div class="product">
            <img src="image/${this.image}" alt="product">
            <div class="info">
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p class="good">${this.sus}ඞ</p>
            </div>
            <button class="buy">Buy</button>
            <p class="cost">$${this.price}</p>
        </div>`);
        this.DOM.find(".buy").click(() => {
            this.buy();
        });
    }

    buy() {
        let _token = $("meta[name='csrf_token']").attr("content");
        $.post("/darkweb/buy", { productId: this.id, _token: _token }).done((res) => {
            alert("Purchase successful");
            GameMaster.getInstance().updateGameState();
        }).fail((res) => {
            alert("Purchase failed");
            console.error(res);
        });
    }
}