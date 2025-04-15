<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Default\Permission;
use App\Models\Default\Role;
use App\Models\Default\RolePermission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class RoleController extends Controller
{
    public function index(Request $request): Response
    {
        $request->user()->allow('view-role', true);

        $query = Role::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('role/index', [
            'data' => $query->paginate(),
        ]);
    }

    public function create(): Response
    {
        return inertia('role/form', [
            'permissions' => Permission::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'string|required|max:255',
            'permissions' => 'array|required',
            'permissions.*.id' => 'ulid|required|exists:permissions,id',
        ]);

        DB::beginTransaction();
        $role = Role::create(['name' => $request->name]);
        foreach ($request->permissions as $permission) {
            RolePermission::create([
                'role_id' => $role->id,
                'permission_id' => $permission['id'],
            ]);
        }
        DB::commit();

        return redirect()->route('roles.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed created']);
    }

    public function edit(Role $role): Response
    {
        return inertia('role/form', [
            'role' => $role->load(['permissions']),
            'permissions' => Permission::all(),
        ]);
    }

    public function update(Request $request, Role $role): RedirectResponse
    {
        $request->validate([
            'name' => 'string|required|max:255',
            'permissions' => 'array|required',
            'permissions.*.id' => 'ulid|required|exists:permissions,id',
        ]);

        if ($role->flag == 1) {
            return redirect()->route('roles.index')
                ->with('message', ['type' => 'error', 'message' => 'Item default can\'t updated']);
        }

        DB::beginTransaction();
        $role->update([
            'name' => $request->name,
        ]);

        RolePermission::where('role_id', $role->id)->delete();

        foreach ($request->permissions as $permission) {
            RolePermission::create([
                'role_id' => $role->id,
                'permission_id' => $permission['id'],
            ]);
        }
        DB::commit();

        return redirect()->route('roles.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Role $role): RedirectResponse
    {
        $deleted = $role->delete();

        if ($deleted) {
            return redirect()->route('roles.index')
                ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
        }

        return redirect()->route('roles.index')
            ->with('message', ['type' => 'error', 'message' => 'Item default can\'t deleted']);
    }
}
