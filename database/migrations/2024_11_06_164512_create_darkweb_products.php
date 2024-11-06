<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('darkweb_products', function (Blueprint $table) {
            $table->id();
            $table->integer('level_criteria');
            $table->string('name');
            $table->text('description');
            $table->string('image');
            $table->integer('price');
            $table->integer('sus');
            $table->json('modifier');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('darkweb_products');
    }
};
