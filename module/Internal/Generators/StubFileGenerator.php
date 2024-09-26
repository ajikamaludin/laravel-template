<?php

namespace Module\Internal\Generators;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use RuntimeException;

class StubFileGenerator
{
    /**
     * Stub path.
     */
    protected string $from;

    /**
     * Stub destination path.
     */
    protected string $to;

    /**
     * The new name of stub file.
     */
    protected string $name;

    /**
     * The stub extension.
     */
    protected ?string $ext;

    /**
     * The list of replaces.
     */
    protected array $replaces;

    /**
     * Set stub path.
     */
    public function from(string $path): static
    {
        $this->from = $path;

        return $this;
    }

    /**
     * Set stub destination path.
     */
    public function to(string $to): static
    {
        $this->to = $to;

        return $this;
    }

    /**
     * Set new stub name.
     */
    public function name(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Set stub extension.
     */
    public function ext(string $ext): static
    {
        $this->ext = $ext;

        return $this;
    }

    /**
     * Set new replace with key and value.
     */
    public function replace(string $key, mixed $value): static
    {
        $this->replaces[$key] = $value;

        return $this;
    }

    /**
     * Set new replace with key and value.
     */
    public function replaces(array $replaces): static
    {
        foreach ($replaces as $key => $value) {
            $this->replaces[$key] = $value;
        }

        return $this;
    }

    /**
     * Download the stub file.
     */
    public function download()
    {
        $this->generate();

        return Response::download($this->getPath());
    }

    /**
     * Generate stub file.
     */
    public function generate(): bool
    {
        // Check path is valid
        if (! File::exists($this->from)) {
            throw new RuntimeException('The stub file does not exist, please enter a valid path.');
        }

        // Check destination dir is exists
        if (! File::isDirectory($this->to)) {
            File::makeDirectory($this->to, 0755, true);
        }

        // Check destination path is valid
        if (! File::isDirectory($this->to)) {
            throw new RuntimeException('The given folder path is not valid : ' . $this->to);
        }

        // Get file content
        $content = File::get($this->from);

        // Replace variables
        foreach ($this->replaces as $search => $value) {
            $content = str_replace("{{ $search }}", $value, $content);
        }

        // Get correct path
        $path = $this->getPath();

        // Copy file
        File::copy($this->from, $path);

        // Put content and write on file
        File::put($path, $content);

        return true;
    }

    /**
     * Get final path.
     */
    private function getPath(): string
    {
        $path = "{$this->to}/{$this->name}";

        // Add extension
        if (! is_null($this->ext)) {
            $path .= ".$this->ext";
        }

        return $path;
    }
}
