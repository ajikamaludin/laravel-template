<?php

namespace Module\Shortlink\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Link extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'id',
        'name',
        'code',
        'real_link',
        'visit_count',
        'last_visited_at',
        'user_id',
        'bot_protection',
        'bot_link',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\Default\User::class, 'user_id');
    }

    public function visitor()
    {
        return $this->hasMany(LinkVisitor::class, 'link_id');
    }

    public static function generateCode()
    {
        $code = Str::random(6);
        if (Link::where('code', $code)->count() != 0) {
            $code = Link::generateCode();
        }

        return $code;
    }
}
