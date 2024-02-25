<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SelectTableController extends Controller
{
    public function __invoke(Request $request, string $table)
    {
        $request->validate([
            'display_name' => 'nullable|string',
            'limit' => 'nullable|integer',
            'offset' => 'nullable|integer',
            'searchable_field' => 'nullable|string',
            'q' => 'nullable|string',
            'orderby' => 'nullable|string',
        ]);
        
        $query = DB::table($table);

        $select_fields = ['id'];
        if ($request->exists('display_name')) {
            $select_fields = array_merge(explode('.', $request->display_name), $select_fields);
        }

        $query->select($select_fields)
            ->limit($request->limit ?? 100);

        if ($request->exists('offset')) {
            $query->offset($request->offset);
        }

        $search_field = array_merge(['id'], $select_fields);
        if ($request->exists('searchable_field')) {
            $search_field = array_merge(explode('.', $request->searchable_field), $search_field);
        }

        if ($request->exists('q')) {
            foreach($search_field as $sq) {
                $query->orWhere($sq, 'like', '%'.$request->q.'%');
            }
        }

        if ($request->exists('orderby')) {
            $orderby = explode('.', $request->orderby);
            $query->orderBy($orderby[0], $orderby[1] ?? 'desc');
        } else {
            $query->orderBy('updated_at',  'desc');
        }

        return $query->get();
    }
}
