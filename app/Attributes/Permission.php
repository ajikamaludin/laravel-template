<?php

namespace App\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_METHOD)]
class Permission
{
    public array $permissions;

    public function __construct(string ...$permissions)
    {
        $this->permissions = $permissions;
    }
}
