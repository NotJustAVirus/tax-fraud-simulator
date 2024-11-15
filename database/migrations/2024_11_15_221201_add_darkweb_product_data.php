<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\DarkwebProduct;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DarkwebProduct::create([
            'level_criteria' => 1,
            'name' => 'Darkweb Access',
            'description' => 'Access to the darkweb',
            'image' => 'darkweb.png',
            'price' => 1000,
            'sus' => 0,
            'modifier' => json_encode(['darkweb' => true]),
        ]);
        DarkwebProduct::create([
            'level_criteria' => 1,
            'name' => 'Stolen Credit Card',
            'description' => 'A stolen credit card',
            'price' => -500,
            'sus' => 200,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
