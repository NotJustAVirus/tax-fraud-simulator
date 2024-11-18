

export  class GameMaster {
    static instance = null;
    gameState = null;
    callback = [];

    static getInstance() {
        if (GameMaster.instance === null) {
            GameMaster.instance = new GameMaster();
        }
        return GameMaster.instance;
    }

    constructor() {
        this.updateGameState();
    }

    updateGameState() {
        $.get('/gamestate', (data) => {
            this.setGameState(data);
        });
    }

    progressGameState() {
        let data = {
            _token: $("meta[name='csrf_token']").attr("content"),
        };
        $.post('/gamestate', data, (data) => {
            this.setGameState(data);
        });
    }

    setGameState(gameState) {
        if (gameState === null) {
            return;
        }
        if (gameState === this.gameState) {
            return;
        }
        this.gameState = gameState;
        for (let i = 0; i < this.callback.length; i++) {
            this.callback[i](this.gameState);
        }
    }

    getGameState() {
        return this.gameState;
    }

    addCallback(callback) {
        this.callback.push(callback);
    }
}