<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Default\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class PermissionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Permission::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('permission/index', [
            'data' => $query->paginate(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'label' => 'required|string|max:255',
        ]);

        Permission::create([
            'name' => $request->name,
            'label' => $request->label,
        ]);

        return redirect()->route('permissions.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been created']);
    }

    public function update(Request $request, Permission $permission): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'label' => 'required|string|max:255',
        ]);

        $permission->fill([
            'name' => $request->name,
            'label' => $request->label,
        ]);

        $permission->save();

        return redirect()->route('permissions.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been updated']);
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();

        return redirect()->route('permissions.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been deleted']);
    }
}
