<?php

namespace App\Service\Finance;

class JobIncome extends FinanceAccount {
    public function __construct() {
        parent::__construct("Job");
    }

    public function getValue(): int {
        return 1000;
    }
}
