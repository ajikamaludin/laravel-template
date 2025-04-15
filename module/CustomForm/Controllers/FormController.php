<?php

namespace Module\CustomForm\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Default\Role;
use Module\CustomForm\Models\Form;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function index(Request $request)
    {
        $query = Form::query();

        if (auth()->user()->role && auth()->user()->role->name == Role::GUEST) {
            $query->where('user_id', auth()->id());
        }

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('custom-form/form/index', [
            'data' => $query->paginate(),
        ]);
    }

    public function create()
    {
        return inertia('custom-form/form/form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'fields' => 'required|json',
        ]);

        Form::create([
            'name' => $request->name,
            'fields' => $request->fields,
        ]);

        return redirect()->route('custom-form.forms.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed created']);
    }

    public function edit(Request $request, Form $form)
    {
        return inertia('custom-form/form/form', [
            'item' => $form,
        ]);
    }

    public function update(Request $request, Form $form)
    {
        $request->validate([
            'name' => 'required|string',
            'fields' => 'required|json',
        ]);

        $form->update([
            'name' => $request->name,
            'fields' => $request->fields,
        ]);

        return redirect()->route('custom-form.forms.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Request $request, Form $form)
    {
        $form->delete();

        return redirect()->route('custom-form.forms.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }
}
