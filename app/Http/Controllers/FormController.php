<?php

namespace App\Http\Controllers;

use App\Models\Form;

class FormController extends Controller {
    public function getForms() {
        // $forms = Form::where('level_criteria', '<=', auth()->user()->level)->get();
        $forms = Form::where('level_criteria', '<=', 1)->get();
        return response()->json($forms);
    }

    public function getForm($id) {
        $form = Form::find($id);
        $form->fields->load('type', 'options');
        return response()->json($form);
    }

    public function submitForm($id) {
        $form = Form::find($id);
        $formAnswer = new FormAnswer();
        $formAnswer->form_id = $form->id;
        $formAnswer->user_id = auth()->user()->id;
        $formAnswer->save();
        foreach ($form->fields as $field) {
            $answer = new FormAnswerField();
            $answer->form_answer_id = $formAnswer->id;
            $answer->field_id = $field->id;
            $answer->value = request('field_' . $field->id);
            $answer->save();
        }
        return "ok";
    }
}
