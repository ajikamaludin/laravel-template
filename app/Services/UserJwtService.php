<?php

namespace App\Services;

use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

class UserJwtService
{
    const ALGO = 'HS256';

    const EXPIRED = 120; // minutes

    const KEYPREFIX = 'ABCSquad_';

    // generate token in login
    public static function generateJwtToken()
    {
        Session::put('user_login_at', $created_at = now()->format('Y_m_d_H_i_s'));

        $key = self::KEYPREFIX . auth()->id() . $created_at;

        $value = JWT::encode(
            [
                'user_id' => auth()->id(),
                'created_at' => $created_at,
                'exp' => now()->addMinutes(self::EXPIRED)->timestamp,
            ],
            config('app.key', 'aji.kamaludin'),
            self::ALGO
        );

        Cache::put($key, $value, now()->addMinutes(self::EXPIRED / 2));

        return $value;
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
        $login_at = Session::get('user_login_at');
        $key = self::KEYPREFIX . auth()->id() . $login_at;

        $existToken = Cache::get($key, '');

        // please renew if session is valid but cache is expired
        if ($existToken == '' && $login_at != '') {
            return self::generateJwtToken();
        }

        return $existToken;
    }
}
