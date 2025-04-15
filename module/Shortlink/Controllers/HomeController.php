<?php

namespace Module\Shortlink\Controllers;

use App\Http\Controllers\Controller;
use Module\Shortlink\Models\Link;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return inertia('shortlink/home/index');
    }

    public function store(Request $request)
    {
        $request->validate(['link' => 'required|string|url']);

        $link = Link::create([
            'name' => $request->input('link'),
            'code' => Link::generateCode(),
            'real_link' => $request->input('link'),
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('shortlink.home')
            ->with('message', [
                'type' => 'success',
                'message' => 'link success created',
                'link' => route('shortlink.redirect', $link),
            ]);
    }

    public function redirect(Request $request, Link $link)
    {
        $link->update([
            'visit_count' => $link->visit_count + 1,
            'last_visited_at' => now(),
        ]);

        $link->visitor()->create([
            'user_id' => auth()->id(),
            'request' => json_encode($request->input()),
            'header' => json_encode($request->header()),
            'device' => $request->header('sec-ch-ua-mobile'),
            'platform' => $request->header('sec-ch-ua-platform', 'bot'),
            'browser' => $request->header('sec-ch-ua'),
            'languages' => json_encode($request->header('accept-language')),
            'ip' => $request->ip(),
            'useragent' => $request->header('user-agent'),
        ]);

        if ($request->header('sec-ch-ua-platform', 'bot') == 'bot' && $link->bot_protection == 1) {
            if ($link->bot_link != null) {
                return redirect($link->bot_link, 302);
            }
            return redirect()->route('shortlink.home');
        }

        return redirect($link->real_link, 302);
    }
}
