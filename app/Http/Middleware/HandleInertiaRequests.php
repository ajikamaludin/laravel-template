<?php

namespace App\Http\Middleware;

use App\Models\Default\Setting;
use App\Services\UserJwtService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'admin';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? $request->user()->load(['role.permissions']) : $request->user(),
                'login_at' => session(null)->get('user_login_at', ''),
                'jwt_token' => UserJwtService::getActiveToken(),
                'jwt_prefix' => UserJwtService::KEYPREFIX,
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],
            'app' => Setting::getByKeys(['app_name', 'app_logo']),
        ]);
    }
}
