<?php

namespace Module\Internal\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class PascalCase implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! preg_match('/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/', $value)) {
            $fail('must be valid PascalCase without space');
        }
    }
}
