<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormAnswer;
use App\Models\Pivots\FormFieldAnswer;

class FormController extends Controller {
    public function getForms() {
        // $forms = Form::where('level_criteria', '<=', auth()->user()->level)->get();
        $forms = Form::where('level_criteria', '<=', 1)->get();
        return response()->json($forms);
    }

    public function getForm($id) {
        $form = Form::find($id);
        $form->fields->load('type', 'options')->sortBy('order');
        return response()->json($form);
    }

    public function getFormAnswers() {
        $answers = FormAnswer::where('user_id', auth()->user()->id)->with('form')->get();
        return response()->json($answers);
    }

    public function submitForm($id) {
        $form = Form::find($id);
        $formData = [];
        foreach ($form->fields as $field) {
            $value = request("field_$field->id");
            if (!$value) {
                if ($field->pivot->required) {
                    return response()->json(['error' => "Field '$field->name' is required"], 400);
                }
                continue;
            }
            $formData[$field->id] = $value;
        }

        if (FormAnswer::where('form_id', $form->id)->where('user_id', auth()->user()->id)->exists()) {
            // Update
            $formAnswer = FormAnswer::where('form_id', $form->id)->where('user_id', auth()->user()->id)->first();
            $formAnswer->day = auth()->user()->gameProgress->day;
            $formAnswer->save();
            FormFieldAnswer::where('form_answer_id', $formAnswer->id)->delete();
        } else {
            // Create
            $formAnswer = new FormAnswer();
            $formAnswer->form_id = $form->id;
            $formAnswer->user_id = auth()->user()->id;
            $formAnswer->day = auth()->user()->gameProgress->day;
            $formAnswer->save();
        }
        
        foreach ($formData as $fieldId => $value) {
            $answer = new FormFieldAnswer();
            $answer->form_answer_id = $formAnswer->id;
            $answer->field_id = $fieldId;
            $answer->value = $value;
            $answer->save();
        }
        return "ok";
    }
}
