<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormFieldOption extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'form_field_options';

    protected $fillable = [
        'value',
    ];

    public function field()
    {
        return $this->belongsTo(FormField::class);
    }
}
