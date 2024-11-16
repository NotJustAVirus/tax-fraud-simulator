<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameProgress extends Model {
    use HasFactory;

    public $timestamps = false;
    protected $table = 'game_progress';

    public function user() {
        return $this->belongsTo(User::class);
    }
}
