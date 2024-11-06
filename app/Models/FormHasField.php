<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class FormHasField extends Pivot
{
    use HasFactory;

    protected $table = 'form_has_fields';

    protected $fillable = [
        'order',
        'required',
    ];

    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    public function field()
    {
        return $this->belongsTo(FormField::class);
    }
}
