<?php

namespace App\Listeners;

use Illuminate\Mail\Events\MessageSending;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class EmailListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageSending $event)
    {
        info(self::class, ['listening...', $event->data['address']]);

        $rules = Validator::make(['email' => $event->data['address']], ['email' => 'email:rfc,dns,spoof']);

        if ($rules->fails() || Str::contains($event->data['address'], '@admin.com')) {
            info(self::class, [$event->data['address'], $event->data, $rules->errors()]);

            return false;
        }
    }
}
