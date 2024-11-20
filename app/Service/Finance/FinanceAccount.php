<?php

namespace App\Service\Finance;

abstract class FinanceAccount {
    protected string $name;
    
    public function __construct(string $name) {
        $this->name = $name;
    }

    public function isExpense(): bool {
        return $this->getValue() < 0;
    }
    
    public function getName(): string {
        return $this->name;
    }
    
    public abstract function getValue(): int;
}
