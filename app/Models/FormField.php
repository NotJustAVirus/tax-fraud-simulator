<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormField extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'form_fields';

    protected $fillable = [
        'name',
        'description',
        'placeholder',
    ];

    public function type()
    {
        return $this->hasOne(FormFieldType::class, 'id', 'type_id');
    }

    public function options()
    {
        return $this->hasMany(FormFieldOption::class, 'field_id');
    }

    public function forms()
    {
        return $this->belongsToMany(Form::class, 'form_has_fields', 'field_id', 'form_id')
            ->using(FormHasField::class)
            ->withPivot('order', 'required');
    }

    public function answers()
    {
        return $this->belongsToMany(FormAnswer::class, 'form_field_answers', 'field_id', 'form_answer_id')
            ->using(FormFieldAnswer::class)
            ->withPivot('value');
    }
}
