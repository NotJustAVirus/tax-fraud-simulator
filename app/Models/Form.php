<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pivots\FormHasField;


class Form extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'forms';

    protected $fillable = [
        'level_criteria',
        'name',
        'description',
        'image',
        'value',
        'sus',
    ];

    public function fields()
    {
        return $this->belongsToMany(FormField::class, 'form_has_fields', 'form_id', 'field_id')
            ->using(FormHasField::class)
            ->withPivot('order', 'required');
    }

    public function answers()
    {
        return $this->hasMany(FormAnswer::class);
    }
}
