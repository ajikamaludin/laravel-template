<?php

namespace App\Services;

use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Cache;

class UserJwtServices
{
    const ALGO = 'HS256';
    const EXPIRED = '120'; // minutes
    const KEYPREFIX = 'SmileSquad ';

    // generate token in login
    public static function generateJwtToken()
    {
        session()->put('user_login_at', $created_at = now());

        $key = auth()->id() . $created_at;

        $value = JWT::encode([
                'user_id' => auth()->id(), 
                'created_at' => $created_at,
                'exp' => now()->addMinutes(self::EXPIRED)->timestamp
            ], 
            config('app.key', 'aji.kamaludin'), 
            self::ALGO
        );

        Cache::put($key, $value, now()->addMinutes(self::EXPIRED));
    }

    // validate token in api middleware
    public static function validateToken($token)
    {
        $token = str_replace(self::KEYPREFIX, '', $token);

        try {
            $payload = JWT::decode($token, new Key(config('app.key', 'aji.kamaludin'), self::ALGO));

            // pretend act as user
            auth()->loginUsingId($payload->user_id);
        } catch (ExpiredException $e) {
            abort('403', 'Expired Token please relogin');
        } catch (Exception $e) {
            abort('403', 'not valid token');
        }
    }

    // only call from inertia middleware that accessable to session
    public static function getActiveToken() 
    {
        $user_id = auth()->id();
        $login_at = session()->get('user_login_at');

        return Cache::get($user_id . $login_at, '');
    }
}