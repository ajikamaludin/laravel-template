<?php

namespace App\Http\Controllers\Default\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SelectTableController extends Controller
{
    /**
     * made this simple only select from master data table
     */
    public function __invoke(Request $request, string $table)
    {
        $request->validate([
            'display_name' => 'nullable|string',
            'limit' => 'nullable|integer',
            'q' => 'nullable|string',
            'orderby' => 'nullable|string',
        ]);

        $query = DB::table($table);

        $select_fields = ['id'];
        if ($request->display_name != '') {
            $select_fields = array_unique(array_merge(explode('|', $request->display_name), $select_fields));
        }

        $query->select($select_fields)->where('deleted_at', null);

        if ($request->q != '') {
            $query->where(function ($query) use ($select_fields, $request) {
                foreach ($select_fields as $sq) {
                    $query->orWhere($sq, 'like', '%' . $request->q . '%');
                }
            });
        }

        if ($request->orderby != '') {
            $orderby = explode('.', $request->orderby);
            $query->orderBy($orderby[0], $orderby[1] ?? 'desc');
        } else {
            $query->orderBy('updated_at', 'desc');
        }

        if ($request->pagination != '') {
            return $query->paginate($request->limit ?? 20);
        }

        return $query->limit($request->limit ?? 100)->get();
    }
}
