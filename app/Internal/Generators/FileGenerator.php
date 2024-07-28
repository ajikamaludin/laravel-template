<?php

namespace App\Internal\Generators;

class FileGenerator
{
    public function __construct(
        private string $Model,
        private array $replaces = []
    ) {}

    public static function new($Model, $replaces)
    {
        return new FileGenerator($Model, $replaces);
    }

    public function ScaffoldModal()
    {
        // ModelController.php
        (new StubFileGenerator)->from(base_path('stubs/scaffold_modal/').'ModelController.stub')
            ->to(app_path('Http/Controllers/'))
            ->name($this->Model.'Controller')
            ->ext('php')
            ->replaces($this->replaces)
            ->generate();

        // Index.jsx
        (new StubFileGenerator)->from(base_path('stubs/scaffold_modal/').'Index.stub')
            ->to(resource_path('js/Pages/').$this->Model.'/')
            ->name('Index')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();

        // FormModal.jsx
        (new StubFileGenerator)->from(base_path('stubs/scaffold_modal/').'FormModal.stub')
            ->to(resource_path('js/Pages/').$this->Model.'/')
            ->name('FormModal')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();
    }

    public function ScaffoldPage()
    {
        // ModelController.php
        (new StubFileGenerator)->from(base_path('stubs/scaffold_page/').'ModelController.stub')
            ->to(app_path('Http/Controllers/'))
            ->name($this->Model.'Controller')
            ->ext('php')
            ->replaces($this->replaces)
            ->generate();

        // Index.jsx
        (new StubFileGenerator)->from(base_path('stubs/scaffold_page/').'Index.stub')
            ->to(resource_path('js/Pages/').$this->Model.'/')
            ->name('Index')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();

        // FormModal.jsx
        (new StubFileGenerator)->from(base_path('stubs/scaffold_page/').'Form.stub')
            ->to(resource_path('js/Pages/').$this->Model.'/')
            ->name('Form')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();
    }

    public function ScaffoldSinglePage()
    {
        // ModelController.php
        (new StubFileGenerator)->from(base_path('stubs/single_page/').'ModelController.stub')
            ->to(app_path('Http/Controllers/'))
            ->name($this->Model.'Controller')
            ->ext('php')
            ->replaces($this->replaces)
            ->generate();

        // Index.jsx
        (new StubFileGenerator)->from(base_path('stubs/single_page/').'Index.stub')
            ->to(resource_path('js/Pages/').$this->Model.'/')
            ->name('Index')
            ->ext('jsx')
            ->replaces($this->replaces)
            ->generate();
    }
}
