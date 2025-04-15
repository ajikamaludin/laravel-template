<?php

namespace Module\Internal\Generators;

use Module\Internal\Services\PermissionService;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ScaffoldGenerator
{
    public const RESERVED_KEYWORDS = [
        '__halt_compiler',
        'abstract',
        'and',
        'array',
        'as',
        'break',
        'callable',
        'case',
        'catch',
        'class',
        'clone',
        'const',
        'continue',
        'declare',
        'default',
        'die',
        'do',
        'echo',
        'else',
        'elseif',
        'empty',
        'enddeclare',
        'endfor',
        'endforeach',
        'endif',
        'endswitch',
        'endwhile',
        'eval',
        'exit',
        'extends',
        'final',
        'finally',
        'for',
        'foreach',
        'function',
        'global',
        'goto',
        'if',
        'implements',
        'include',
        'include_once',
        'instanceof',
        'insteadof',
        'interface',
        'isset',
        'list',
        'namespace',
        'new',
        'null',
        'or',
        'print',
        'private',
        'protected',
        'public',
        'require',
        'require_once',
        'return',
        'static',
        'switch',
        'throw',
        'trait',
        'try',
        'unset',
        'use',
        'var',
        'while',
        'with',
        'xor',
        'yield',
        'yield_from',
        // JavaScript reserved keywords
        'arguments',
        'await',
        'boolean',
        'break',
        'byte',
        'case',
        'catch',
        'char',
        'class',
        'const',
        'continue',
        'debugger',
        'default',
        'delete',
        'do',
        'double',
        'else',
        'enum',
        'eval',
        'export',
        'extends',
        'false',
        'final',
        'finally',
        'float',
        'for',
        'function',
        'goto',
        'if',
        'implements',
        'import',
        'in',
        'instanceof',
        'int',
        'interface',
        'let',
        'long',
        'native',
        'new',
        'null',
        'package',
        'private',
        'protected',
        'public',
        'return',
        'short',
        'static',
        'super',
        'switch',
        'synchronized',
        'this',
        'throw',
        'throws',
        'transient',
        'true',
        'try',
        'typeof',
        'var',
        'void',
        'volatile',
        'while',
        'with',
        'yield',
    ];

    public string $model;

    public string $modelSplitPascalCase;

    public string $ModelSplit;

    public string $models;

    public string $Model;

    public bool $adminAccess = false;

    public array $defaultDestinations; //for revert purpose

    public array $fields; //not yet used

    public array $replaces;

    public function __construct(
        string $model, //$model always CamelCase
        bool $adminAccess = false,
        array $fields = [],
        public $createModelClass = false,
    ) {
        //Customer -> customer or CustomerCare -> customerCare
        $this->model = Str::camel($model);

        // Customer -> Customer or CustomerCare -> Customer Care
        $this->ModelSplit = implode(" ", explode("-", splitPascalCase($model)));

        //Customer -> customer or CustomerCare -> customer-care
        $this->modelSplitPascalCase = str(splitPascalCase($model))->lower();

        //Customer -> customers or CustomerCare -> customer-cares
        $this->models = Str::plural(str(splitPascalCase($model))->lower());

        $this->Model = $model; //Customer

        $this->adminAccess = $adminAccess;

        $this->fields = $fields;

        $this->defaultDestinations = [
            'files' => [app_path("Http/Controllers/{$this->Model}Controller.php")],
            'dirs' => [resource_path("js/pages/{$this->modelSplitPascalCase}")],
        ];

        $this->replaces = [
            'model' => $this->model,
            'models' => $this->models,
            'Model' => $this->Model,
            'modelSplitPascalCase' => $this->modelSplitPascalCase,
            'ModelSplit' => $this->ModelSplit,
        ];
    }

    public function isModelKeywordAllowed()
    {
        return in_array($this->model, self::RESERVED_KEYWORDS);
    }

    public function isModelExists()
    {
        return File::exists(app_path('Models/' . $this->Model . '.php'));
    }

    public function withProtectedAdminAccess($adminAccess)
    {
        $this->adminAccess = $adminAccess;

        return $this;
    }

    public function withCreateModelClass($command, $createModelClass)
    {
        $this->createModelClass = $createModelClass;
        if ($createModelClass) {
            $command->call('make:model', ['name' => $this->Model, '-m' => true]);
        }

        return $this;
    }

    public function ScaffoldModal()
    {
        try {
            // File: ModelController.php, Index.jsx, FormModal.jsx
            FileGenerator::new($this->Model)
                ->withResoucePath($this->modelSplitPascalCase)
                ->withReplaces($this->replaces)
                ->ScaffoldModal();

            // Web Router
            $positionName = $this->adminAccess ? '// #Admin' : null;
            RouteGenerator::new()
                ->addWebUse($this->Model)
                ->addMenu($this->Model, $this->models, "view-{$this->modelSplitPascalCase}")
                ->addWebRoutes([
                    ['get', $this->models, $this->Model, 'index', $this->models . '.index', $positionName],
                    ['post', $this->models, $this->Model, 'store', $this->models . '.store', $positionName],
                    ['put', $this->models . '/{' . $this->model . '}', $this->Model, 'update', $this->models . '.update', $positionName],
                    ['delete', $this->models . '/{' . $this->model . '}', $this->Model, 'destroy', $this->models . '.destroy', $positionName],
                ]);

            // Permission
            $this->createResourcePermissions();
        } catch (\Exception $e) {
            $this->removeDefaultDestinations();
            info(self::class, ['message' => $e->getMessage()]);

            return false;
        }

        return true;
    }

    public function ScaffoldPage()
    {
        try {
            // File: ModelController.php, Index.jsx, Form.jsx
            FileGenerator::new($this->Model)
                ->withResoucePath($this->modelSplitPascalCase)
                ->withReplaces($this->replaces)
                ->ScaffoldPage();

            // Web Router
            $positionName = $this->adminAccess ? '// #Admin' : null;
            RouteGenerator::new()
                ->addWebUse($this->Model)
                ->addMenu($this->Model, $this->models,  "view-{$this->modelSplitPascalCase}")
                ->addWebRoute('resource', $this->models, $this->Model, positionName: $positionName);

            // Permission
            $this->createResourcePermissions();
        } catch (\Exception $e) {
            $this->removeDefaultDestinations();
            info(self::class, ['message' => $e->getMessage()]);

            return false;
        }

        return true;
    }

    public function ScaffoldSinglePage()
    {
        try {
            // File: ModelController.php, Index.jsx
            FileGenerator::new($this->Model)
                ->withResoucePath($this->modelSplitPascalCase)
                ->withReplaces($this->replaces)
                ->ScaffoldSinglePage();

            // Web Router
            $positionName = $this->adminAccess ? '// #Admin' : null;
            RouteGenerator::new()
                ->addWebUse($this->Model)
                ->addMenu($this->Model, $this->models, "view-{$this->modelSplitPascalCase}")
                ->addWebRoutes([
                    ['get', $this->models, $this->Model, 'index', $this->models . '.index', $positionName],
                    ['post', $this->models, $this->Model, 'update', $this->models . '.update', $positionName],
                ]);

            // Permission
            PermissionGenerator::new()->addPermission('view-' . $this->model, 'View ' . $this->Model);
            PermissionService::new()->sync();
        } catch (\Exception $e) {
            $this->removeDefaultDestinations();
            info(self::class, ['message' => $e->getMessage()]);

            return false;
        }

        return true;
    }

    private function removeDefaultDestinations()
    {
        foreach ($this->defaultDestinations['dirs'] as $d) {
            File::deleteDirectory($d);
        }
        foreach ($this->defaultDestinations['files'] as $d) {
            File::delete($d);
        }
        if ($this->createModelClass) {
            File::delete(app_path('Models/' . $this->Model . '.php'));
        }
    }

    private function createResourcePermissions()
    {
        PermissionGenerator::new()
            ->addPermissions([
                ["view-{$this->modelSplitPascalCase}", "View {$this->ModelSplit}"],
                ["create-{$this->modelSplitPascalCase}", "Create {$this->ModelSplit}"],
                ["update-{$this->modelSplitPascalCase}", "Update {$this->ModelSplit}"],
                ["delete-{$this->modelSplitPascalCase}", "Delete {$this->ModelSplit}"],
            ]);

        PermissionService::new()->sync();
    }
}
