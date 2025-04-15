<?php

use Illuminate\Support\Number;

if (!function_exists('splitPascalCase')) {
    function splitPascalCase($string)
    {
        $word = '';
        // Use a regular expression to insert a space before each capital letter except the first one
        $splitString = preg_replace('/(?<!^)([A-Z])/', ' $1', $string);
        foreach (explode(' ', $splitString) as $index => $s) {
            if ($index == 0) {
                $word .= $s;

                continue;
            }
            $word .= '-' . $s;
        }

        return $word;
    }
}

if (!function_exists('formatIDR')) {
    function formatIDR($number)
    {
        if (!$number) {
            return 0;
        }

        return trim(str_replace(',', '.', str_replace('IDR', '', (Number::currency($number, 'IDR', precision: 0)))));
    }
}

if (!function_exists('formatDate')) {
    function formatDate($date)
    {
        return \Illuminate\Support\Carbon::parse($date)->format('d-m-Y');
    }
}

if (!function_exists('formatNumZero')) {
    function formatNumZero($n)
    {
        $max = 3; // 0001

        $number = '';
        foreach (range(0, $max - strlen($n)) as $_) {
            $number .= '0';
        }

        return $number . $n;
    }
}
