<?php

namespace App\Service;

use App\Models\GameProgress;

class GameService {
    private $gameProgress;
    private $financeService;


    public function __construct(GameProgress $gameProgress) {
        $this->gameProgress = $gameProgress;
        $this->financeService = new FinanceService();
    }

    public function processDay() {
        $this->gameProgress->day += 1;
        $this->gameProgress->money += $this->financeService->getAccountsPayout();
        $this->gameProgress->sus -= 1;
        $this->gameProgress->save();
    }
}
