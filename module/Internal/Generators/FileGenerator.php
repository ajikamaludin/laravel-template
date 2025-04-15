<?php

namespace Module\Internal\Generators;

use Illuminate\Support\Str;

class FileGenerator
{
    protected $model;
    protected $resourcePath;
    protected $replaces;
    protected $controllerPath;
    protected $controllerName;

    public function __construct(
        private string $Model
    ) {
        $this->model = Str::lower($this->Model);
        $this->resourcePath = resource_path("js/pages/{$this->model}/");

        $this->controllerPath = app_path('Http/Controllers/');
        $this->controllerName = $this->Model . 'Controller';
    }

    public static function new($Model)
    {
        return new FileGenerator($Model);
    }

    public function withResoucePath($resourcePath)
    {
        $this->resourcePath = resource_path("js/pages/{$resourcePath}/");

        return $this;
    }

    public function withReplaces(array $replaces)
    {
        $this->replaces = $replaces;

        return $this;
    }

    public function ScaffoldModal()
    {
        // ModelController.php
        (new StubFileGenerator)->from(base_path('stubs/scaffold_modal/') . 'ModelController.stub')
            ->to($this->controllerPath)
            ->name($this->controllerName)
            ->ext('php')
            ->replaces($this->replaces)
            ->generate();

        // Index.jsx
        (new StubFileGenerator)->from(base_path('stubs/scaffold_modal/') . 'index.stub')
            ->to($this->resourcePath)
            ->name('index')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();

        // FormModal.jsx
        (new StubFileGenerator)->from(base_path('stubs/scaffold_modal/') . 'form-modal.stub')
            ->to($this->resourcePath)
            ->name('form-modal')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();
    }

    public function ScaffoldPage()
    {
        // ModelController.php
        (new StubFileGenerator)->from(base_path('stubs/scaffold_page/') . 'ModelController.stub')
            ->to($this->controllerPath)
            ->name($this->controllerName)
            ->ext('php')
            ->replaces($this->replaces)
            ->generate();

        // Index.jsx
        (new StubFileGenerator)->from(base_path('stubs/scaffold_page/') . 'index.stub')
            ->to($this->resourcePath)
            ->name('index')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();

        // form.jsx
        (new StubFileGenerator)->from(base_path('stubs/scaffold_page/') . 'form.stub')
            ->to($this->resourcePath)
            ->name('form')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();
    }

    public function ScaffoldSinglePage()
    {
        // ModelController.php
        (new StubFileGenerator)->from(base_path('stubs/single_page/') . 'ModelController.stub')
            ->to($this->controllerPath)
            ->name($this->controllerName)
            ->ext('php')
            ->replaces($this->replaces)
            ->generate();

        // Index.jsx
        (new StubFileGenerator)->from(base_path('stubs/single_page/') . 'index.stub')
            ->to($this->resourcePath)
            ->name('index')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();
    }
}
