<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class FormFieldAnswer extends Pivot
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'form_field_answers';

    protected $fillable = [
        'value',
    ];

    public function field()
    {
        return $this->belongsTo(FormField::class);
    }

    public function answer()
    {
        return $this->belongsTo(FormAnswer::class);
    }
}
