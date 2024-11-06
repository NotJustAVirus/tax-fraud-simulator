<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormFieldType extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'form_field_types';

    protected $fillable = [
        'name',
    ];

    public function fields()
    {
        return $this->hasMany(FormField::class, 'type_id');
    }
}
