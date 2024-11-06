<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Form;
use App\Models\FormField;
use App\Models\FormHasField;
use App\Models\FormFieldType;
use App\Models\FormFieldOption;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $typeText = FormFieldType::create(['name' => 'text']);
        $typeTextArea = FormFieldType::create(['name' => 'textarea']);
        $typeSelect = FormFieldType::create(['name' => 'select']);
        $typeRadio = FormFieldType::create(['name' => 'radio']);
        $typeCheckbox = FormFieldType::create(['name' => 'checkbox']);
        $typeDate = FormFieldType::create(['name' => 'date']);
        $typeNumber = FormFieldType::create(['name' => 'number']);

        $fieldName = $typeText->fields()->create([
            'name' => 'Full Name',
            'description' => 'Your full name',
            'placeholder' => 'John Doe',
        ]);
        $fieldEmail = $typeText->fields()->create([
            'name' => 'Email',
            'description' => 'An email address to spam you',
            'placeholder' => 'name@example.com',
        ]);
        $fieldBirthdate = $typeDate->fields()->create([
            'name' => 'Birthdate',
            'description' => 'The date you came to this world',
        ]);
        $fieldGender = $typeRadio->fields()->create([
            'name' => 'Sex',
            'description' => 'How do you identify yourself',
        ]);
        $fieldGender->options()->createMany([
            ['value' => 'Male'],
            ['value' => 'Female'],
            ['value' => 'Apache Attack Helicopter'],
        ]);
        $fieldAddress = $typeText->fields()->create([
            'name' => 'Address',
            'description' => 'Where can we find you (:',
            'placeholder' => '1234 Street, City, 62701',
        ]);
        $fieldSecurity = $typeSelect->fields()->create([
            'name' => 'Security Question',
        ]);
        $fieldSecurity->options()->createMany([
            ['value' => 'What is your favorite color?'],
            ['value' => 'What is your mother\'s maiden name?'],
            ['value' => 'What is your favorite security question?'],
            ['value' => 'What is the name of your first pet?'],
        ]);
        $fieldSecurityAnswer = $typeText->fields()->create([
            'name' => 'Security Question Answer',
        ]);

        $form = Form::create([
            'level_criteria' => 1,
            'name' => 'Tax Return Form',
            'description' => 'Fill this form to get your well deserved tax return',
            'value' => 10,
            'sus' => 100,
        ]);
        $form->fields()->attach($fieldName, ['order' => 1, 'required' => true]);
        $form->fields()->attach($fieldBirthdate, ['order' => 3, 'required' => true]);
        $form->fields()->attach($fieldGender, ['order' => 4, 'required' => true]);
        $form->fields()->attach($fieldAddress, ['order' => 5, 'required' => true]);
        $form->fields()->attach($fieldSecurity, ['order' => 6, 'required' => true]);
        $form->fields()->attach($fieldSecurityAnswer, ['order' => 7, 'required' => true]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
