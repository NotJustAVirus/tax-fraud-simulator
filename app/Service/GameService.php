<?php

namespace App\Service;

use App\Models\GameProgress;

class GameService {
    private $gameProgress;
    private $financeService;


    public function __construct() {
        $this->gameProgress = auth()->user()->gameProgress;
        if (!$this->gameProgress) {
            $this->gameProgress = new GameProgress();
            auth()->user()->gameProgress()->save($this->gameProgress);
            $this->gameProgress->save();
        }
        $this->financeService = new FinanceService();
    }

    public function processDay() {
        $this->gameProgress->day += 1;
        $this->gameProgress->money += $this->financeService->getAccountsPayout();
        $this->gameProgress->sus -= 1;
        if ($this->gameProgress->sus < 0) {
            $this->gameProgress->sus = 0;
        }
        $this->gameProgress->save();
    }

    public function getGameProgress() {
        return $this->gameProgress;
    }

    public function getFinance() {
        return $this->financeService->exportAccounts();
    }


    public function hasMoney($amount) {
        return $this->gameProgress->money >= $amount;
    }

    public function isTooLowLevel($level) {
        return $this->gameProgress->level < $level;
    }

    public function isTooMuchSus($sus) {
        // TODO: should take into account suscap
        return $this->gameProgress->sus + $sus > 1000;
    }


    public function addSus($sus) {
        $this->gameProgress->sus += $sus;
        $this->gameProgress->save();
    }

    public function withdraw($amount) {
        $this->gameProgress->money -= $amount;
        $this->gameProgress->save();
    }
}
