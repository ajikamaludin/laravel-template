<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="aji19kamaludin@gmail.com">

    <title>Laravel</title>

    <!-- Styles -->
    @vite(['resources/css/app.css'])

</head>

<body class="antialiased text-2xl w-screen justify-center h-screen items-center flex flex-row">
    {{ env('APP_NAME') }}
</body>

</html>