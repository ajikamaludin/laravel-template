<?php

namespace App\Modules\CustomForm\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CustomForm\Models\Form;
use App\Modules\CustomForm\Models\FormRecord;
use Illuminate\Http\Request;

class FormRecordController extends Controller
{
    public function index(Form $form)
    {
        $query = FormRecord::query()->where('form_id', $form->id);

        $query->orderBy('created_at', 'desc');

        return inertia('CustomForm/Record/Index', [
            'field' => $form,
            'data' => $query->paginate(),
        ]);
    }

    public function create(Form $form)
    {
        return inertia('CustomForm/Record/Form', [
            'field' => $form
        ]);
    }

    public function store(Request $request, Form $form)
    {
        $request->validate([
            'fields' => 'required|json',
        ]);

        $form->records()->create([
            'fields' => $request->fields,
        ]);

        return redirect()->route('custom-form.form-records.index', $form)
            ->with('message', ['type' => 'success', 'message' => 'Item has beed created']);
    }

    public function edit(Form $form, FormRecord $formRecord)
    {
        return inertia('CustomForm/Record/Form', [
            'field' => $form,
            'item' => $formRecord,
        ]);
    }

    public function update(Request $request, Form $form, FormRecord $formRecord)
    {
        $request->validate([
            'fields' => 'required|json',
        ]);

        $formRecord->update([
            'fields' => $request->fields,
        ]);

        return redirect()->route('custom-form.form-records.index', $form)
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Form $form, FormRecord $formRecord)
    {
        $formRecord->delete();

        return redirect()->route('custom-form.form-records.index', $form)
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }
}
