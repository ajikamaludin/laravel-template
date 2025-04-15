<?php

namespace Module\CustomForm\Controllers;

use App\Http\Controllers\Controller;
use Module\CustomForm\Models\Form;
use Module\CustomForm\Models\FormRecord;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Rap2hpoutre\FastExcel\FastExcel;

class FormRecordController extends Controller
{
    public function index(Request $request, Form $form)
    {
        $query = FormRecord::query()->where('form_id', $form->id);

        if ($request->q != '') {
            $query->where('fields', 'like', '%' . $request->q . '%');
        }

        $query->orderBy('created_at', 'desc');

        return inertia('custom-form/record/index', [
            'field' => $form,
            'data' => $query->paginate(),
        ]);
    }

    public function create(Form $form)
    {
        return inertia('custom-form/record/form', [
            'field' => $form,
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

        if (auth()->check()) {
            return redirect()->route('custom-form.form-records.index', $form)
                ->with('message', ['type' => 'success', 'message' => 'Item has beed created']);
        }

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'Form has been saved']);
    }

    public function edit(Form $form, FormRecord $formRecord)
    {
        return inertia('custom-form/record/form', [
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

    public function open(Form $form)
    {
        return inertia('custom-form/record/public-form', [
            'field' => $form,
        ]);
    }

    public function export(Form $form)
    {
        $collections = collect();

        // active headers of fields
        $fields = json_decode($form->fields);
        $headers = [];
        foreach ($fields as $field) {
            $headers[] = $field->name;
        }

        $records = $form->records()->orderBy('updated_at', 'desc')->get();
        foreach ($records as $record) {
            $d = [];
            $r = json_decode($record->fields);
            foreach ($r as $rd) {
                if (in_array($rd->name, $headers)) {
                    $d[$rd->name] = $rd->value ?? '';
                }
            }
            $collections->add($d);
        }

        $name = $form->name . '_' . now()->format('d-m-Y_H-i') . '.xlsx';

        return (new FastExcel($collections))->download($name);
    }

    public function print(Form $form)
    {
        $collections = collect();

        $fields = json_decode($form->fields);
        $headers = [];
        foreach ($fields as $field) {
            $headers[] = $field->name;
        }

        $records = $form->records()->orderBy('updated_at', 'desc')->get();
        foreach ($records as $record) {
            $d = [];
            $r = json_decode($record->fields);
            foreach ($r as $rd) {
                if (in_array($rd->name, $headers)) {
                    $d[$rd->name] = $rd->value ?? '';
                }
            }
            $collections->add($d);
        }

        $pdf = Pdf::loadView('prints.custom-form.print', [
            'collections' => $collections,
            'form' => $form,
            'headers' => $headers,
        ])->setPaper('a4', 'landscape');

        return $pdf->stream();
    }
}
