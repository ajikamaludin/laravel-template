<?php

namespace Module\Shortlink\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Default\Role;
use Module\Shortlink\Models\Link;
use Module\Shortlink\Models\LinkVisitor;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class LinkController extends Controller
{
    public function index(Request $request)
    {
        $query = Link::with(['user']);

        if (auth()->user()->role && auth()->user()->role->name == Role::GUEST) {
            $query->where('user_id', auth()->id());
        }

        if ($request->q) {
            $query->where(function ($query) use ($request) {
                $query->where('name', 'like', "%{$request->q}%")
                    ->orWhere('real_link', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('last_visited_at', 'desc');

        return inertia('shortlink/link/index', [
            'data' => $query->paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['link' => 'required|string|url']);

        Link::create([
            'name' => $request->input('name'),
            'code' => $request->code ?? Link::generateCode(),
            'real_link' => $request->input('link'),
            'user_id' => auth()->id(),
            'bot_protection' => $request->input('bot_protection', 0),
        ]);

        return redirect()->route('shortlink.link.index')
            ->with('message', ['type' => 'success', 'message' => 'link success created']);
    }

    public function show(Request $request, Link $link)
    {
        $query = LinkVisitor::where('link_id', $link->id)->orderBy('created_at', 'desc');

        $startDate = now()->subDays(30);
        $endDate = now()->addDay(1);

        if ($request->startDate != '' && $request->endDate != '') {
            $startDate = Carbon::parse($request->startDate);
            $endDate = Carbon::parse($request->endDate);
        }

        $query->whereBetween(DB::raw('DATE(created_at)'), [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')]);

        $charts = [];
        $visitors = $query->clone()
            ->groupBy('date')
            ->get([
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(id) as visitor'),
            ])
            ->mapWithKeys(fn($item) => [$item['date'] => $item['visitor']]);

        $std = Carbon::parse($startDate);
        while ($std <= $endDate) {
            $charts[] = [
                'date' => $std->format('d-m-Y'),
                'visitor' => $visitors[$std->format('Y-m-d')] ?? 0,
            ];
            $std = $std->addDay();
        }

        return inertia('shortlink/link/show', [
            'link' => $link,
            'data' => $query->paginate(20),
            'charts' => $charts,
            '_startDate' => $startDate->format('Y-m-d'),
            '_endDate' => $endDate->format('Y-m-d'),
        ]);
    }

    public function update(Request $request, Link $link)
    {
        $request->validate([
            'link' => 'required|string|url',
            'code' => 'required|alpha_dash',
        ]);

        $link->update([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'real_link' => $request->input('link'),
            'user_id' => auth()->id(),
            'bot_protection' => $request->input('bot_protection', 0),
        ]);

        return redirect()->route('shortlink.link.index')
            ->with('message', ['type' => 'success', 'message' => 'link success updated']);
    }

    public function destroy(Link $link)
    {
        $link->delete();

        return redirect()->route('shortlink.link.index')
            ->with('message', ['type' => 'success', 'message' => 'link success deleted']);
    }
}
