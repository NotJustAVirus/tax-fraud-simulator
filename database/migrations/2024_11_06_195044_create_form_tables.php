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
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
            $table->integer('level_criteria');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->integer('value');
            $table->integer('sus');
        });

        Schema::create('form_field_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('form_fields', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('placeholder')->nullable();

            $table->foreignId('type_id')->constrained('form_field_types');
        });

        Schema::create('form_field_options', function (Blueprint $table) {
            $table->id();
            $table->string('value');
            
            $table->foreignId('field_id')->constrained('form_fields');
        });

        Schema::create('form_has_fields', function (Blueprint $table) {
            $table->id();
            $table->integer('order');
            $table->boolean('required')->default(true);

            $table->foreignId('form_id')->constrained('forms');
            $table->foreignId('field_id')->constrained('form_fields');
        });

        Schema::create('form_answers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->boolval('to_fax')->default(true);
            $table->integer('day');

            $table->foreignId('form_id')->constrained('forms');
            $table->foreignId('user_id')->constrained('users');
        });

        Schema::create('form_field_answers', function (Blueprint $table) {
            $table->id();
            $table->string('value');

            $table->foreignId('form_answer_id')->constrained('form_answers');
            $table->foreignId('field_id')->constrained('form_fields');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_field_answers');
        Schema::dropIfExists('form_answers');
        Schema::dropIfExists('form_has_fields');
        Schema::dropIfExists('form_field_options');
        Schema::dropIfExists('form_fields');
        Schema::dropIfExists('form_field_types');
        Schema::dropIfExists('forms');
    }
};
