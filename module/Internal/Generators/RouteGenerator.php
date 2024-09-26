<?php

namespace Module\Internal\Generators;

use Exception;
use Illuminate\Support\Facades\File;

class RouteGenerator
{
    protected $menuFile = 'Constants/MenuConstant.php';

    public static function new()
    {
        return new RouteGenerator;
    }

    public function addWebUse($model)
    {
        $contoller = $model . 'Controller';
        $use = "\n" . 'use App\Http\Controllers' . '\\' . $contoller . ';';

        $file = File::get(base_path('routes/web.php'));

        $position = strpos($file, '<?php \n') + 6;
        $file = substr_replace($file, $use, $position, 0);

        File::put(base_path('routes/web.php'), $file);

        return $this;
    }

    public function addWebRoute($method, $uri, $model, $func = null, $name = null, $positionName = null)
    {
        $contoller = $model . 'Controller';

        $route = "\nRoute::$method('$uri'";

        if ($func == null) {
            $route .= ", $contoller::class)";
        } else {
            $route .= ", [$contoller::class,'$func'])";
        }

        if ($name != null) {
            $route .= "->name('$name')";
        }

        $route .= ';';

        $routePath = base_path('routes/web.php');
        $file = File::get($routePath);

        $position = -1;
        if ($positionName != null) {
            $position = strpos($file, $positionName) + strlen($positionName) ?: -1;
        }

        if ($position) {
            $file = substr_replace($file, $route, $position, 0);
            File::put($routePath, $file);
        }

        return $this;
    }

    public function addMenu($name,  $routeName, $permissionName, $icon = 'HiClipboardDocumentList')
    {
        $menu = "
            [
                'name' => '$name',
                'show' => true,
                'icon' => '$icon',
                'route' => route('$routeName.index'),
                'active' => '$routeName.*',
                'permission' => '$permissionName',
            ],";

        // Open the file in read mode to read its contents
        $file = File::get(app_path($this->menuFile));

        $marker = "// # Add Generated Menu Here!\n";
        $position = strpos($file, $marker) + strlen($marker);

        if (! $position) {
            throw new Exception('MenuConstant marker is not set');
        }

        $file = substr_replace($file, $menu, $position, 0);

        // Open the file in write mode to overwrite its contents
        File::put(app_path($this->menuFile), $file);

        return $this;
    }

    public function addWebRoutes(array $routes)
    {
        foreach ($routes as $route) {
            $this->addWebRoute(...$route);
        }

        return $this;
    }
}
