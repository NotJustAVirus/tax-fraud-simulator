<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DarkwebProduct extends Model
{
    use HasFactory;

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
}
