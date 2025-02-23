<!DOCTYPE html>
<html lang="en" data-theme="winter">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="aji19kamaludin@gmail.com">
    
    <title>Document</title>
    <style>
        {!! Vite::content('resources/css/app.css') !!}
    </style>
    <style>
        .page-break {
            page-break-after: always;
        }
    </style>
</head>

<body>
    <table class="w-full mb-4">
        <tr>
            <td class="font-bold text-2xl text-left">{{ $form->name }}</td>
            <td>
                {{-- <img src="{{ storage_path('/app/public/'.$setting->getValueByKey('app_logo')) }}" style="width: 200px;" /> --}}
            </td>
        </tr>
    </table>
    <hr />
    <table class="border-collapse border border-black w-full">
        <thead>
            <tr class="border border-black">
                <td class="border border-black font-bold p-1 max-w-sm">
                    No
                </td>
                @foreach ($headers as $index => $item)
                    <td class="border border-black font-bold p-1 max-w-sm">
                        {{ $item }}
                    </td>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach ($collections as $index => $item)
                <tr class="border border-black">
                    <td class="border border-black p-1 max-w-sm">
                        {{ $index + 1 }}
                    </td>
                    @foreach ($item as $i)
                        <td class="border border-black p-1 max-w-sm">
                            {{ $i }}
                        </td>
                    @endforeach
                    @if (count($item) != count($headers))
                        @foreach (range(1, count($headers) - count($item)) as $_)
                            <td class="border border-black p-1 max-w-sm">
                            </td>
                        @endforeach
                    @endif
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
