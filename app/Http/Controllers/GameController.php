<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\GameService;

class GameController extends Controller {

    public function __construct() {
        $this->gameService = new GameService();
    }
    
    public function getState() {
        $gameProgress = $this->gameService->getGameProgress();
        return response()->json($gameProgress);
    }

    public function updateState() {
        $gameService = new GameService();
        $gameService->processDay();
        return $this->getState();
    }

    public function getFinance() {
        $finance = $this->gameService->getFinance();
        return response()->json($finance);
    }
}
