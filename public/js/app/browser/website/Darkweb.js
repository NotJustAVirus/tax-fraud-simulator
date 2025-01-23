import { GameMaster } from '../../../GameMaster.js';
import { WebsiteScript } from './WebsiteScript.js';

export class Darkweb extends WebsiteScript {

    run() {
        $.get("/darkweb").done((items) => {
            this.items = items;
            this.displayItems();
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

    displayItems() {
        let grid = this.DOM.find(".productgrid");
        grid.empty();
        for (let item of this.items) {
            let itemNavButton = this.createItemNavButton(item);
            grid.append(itemNavButton);
        }
    }

    createItemNavButton(item) {
        let imgSrc = item.image ? item.image : "icon/battery.png";
        let productDiv = $(`
        <div class="product">
            <img src="image/${imgSrc}" alt="product">
            <div class="info">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p class="good">${item.sus}ඞ</p>
            </div>
            <button class="buy">Buy</button>
            <p class="cost">$${item.price}</p>
        </div>`);
        productDiv.find(".buy").click(() => {
            let _token = $("meta[name='csrf_token']").attr("content");
            $.post("/darkweb/buy", { productId: item.id, _token: _token }).done((res) => {
                alert("Purchase successful");
                GameMaster.getInstance().updateGameState();
            }).fail((res) => {
                alert("Purchase failed");
                console.error(res);
            });
        });
        return productDiv;
    }
}