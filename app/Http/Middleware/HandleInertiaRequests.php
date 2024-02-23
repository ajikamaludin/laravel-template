<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use App\Services\UserJwtServices;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
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
                'login_at' => session()->get('user_login_at', ''),
                'jwt_token' => UserJwtServices::getActiveToken(),
                'jwt_prefix' => UserJwtServices::KEYPREFIX
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],
            'app_name' => Setting::getByKey('app_name'),
        ]);
    }
}
