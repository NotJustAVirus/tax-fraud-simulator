<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DarkwebProduct extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'darkweb_products';

    protected $fillable = [
        'level_criteria',
        'name',
        'description',
        'image',
        'price',
        'sus',
        'modifier',
    ];


    public function owners() {
        return $this->hasMany(User::class, 'darkweb_transactions', 'product_id', 'user_id');
    }
}
