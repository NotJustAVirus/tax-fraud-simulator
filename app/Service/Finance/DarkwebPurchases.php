<?php

namespace App\Service\Finance;

use App\Models\Pivots\DarkwebTransaction;

class DarkwebPurchases extends FinanceAccount {
    public function __construct() {
        parent::__construct("Darkweb Purchases");
    }

    public function getValue(): int {
        $day = auth()->user()->gameProgress->day;
        return -auth()->user()->darkwebProducts()->wherePivot('day', $day)->sum('darkweb_transactions.price');
    }
}