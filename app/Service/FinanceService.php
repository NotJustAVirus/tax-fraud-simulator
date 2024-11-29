<?php

namespace App\Service;

class FinanceService {
    private $accounts = [];

    public function __construct() {
        $this->accounts = [
            new Finance\JobIncome(),
            new Finance\DarkwebPurchases(),
        ];
    }

    public function exportAccounts(): array {
        $export = ["expense" => [], "income" => []];
        foreach ($this->accounts as $account) {
            $name = $account->getName();
            $value = $account->getValue();
            if ($account->isExpense()) {
                $export["expense"][$name] = $value;
            } else {
                $export["income"][$name] = $value;
            }
        }
        return $export;
    }

    public function getAccountsPayout(): int {
        $total = 0;
        foreach ($this->accounts as $account) {
            $total += $account->getValue();
        }
        return $total;
    }
}
