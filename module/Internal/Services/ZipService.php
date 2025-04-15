<?php

namespace Module\Internal\Services;

use Exception;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use Spatie\Async\Pool;
use Throwable;
use ZipArchive;

class ZipService
{
    protected $zip;

    protected $numThreads = 4;

    protected $chunkSize = 2000; //2000 files

    protected $excludedContains = [
        '.git/',
        'storage/app/public',
        'module/Internal',
        '.vscode',
        '.zip',
        '.gif',
        'node_modules',
        'tests',
        'stubs',
    ];

    protected $excludedPaths = [
        'ROADMAP.md',
        'DEPLOY.md',
        'docker-compose.yml',
        'Dockerfile',
        'storage/logs/laravel.log',
    ];

    protected $files = [];

    protected $hashMap = [];

    public function __construct($numThreads = 4)
    {
        ini_set('memory_limit', '-1');
        $this->zip = new ZipArchive;
        $this->$numThreads = $numThreads;
    }

    public function addExcludedPaths(array $path)
    {
        $this->excludedContains = array_merge($path, $this->excludedContains);
    }

    public function addExcludedContains(string $path)
    {
        $this->excludedContains[] = $path;
    }

    public function create($source, $destination)
    {
        if (! file_exists($source)) {
            throw new Exception("file exists $destination");
        }

        $files = $this->collect($source);

        $chunks = array_chunk($files, $this->chunkSize);

        $pool = Pool::create();
        foreach ($chunks as $index => $chunk) {
            $pool->add(function () use ($chunk, $destination, $index) {
                $zip = new ZipArchive;
                $zipFileName = preg_replace('/\.zip$/', "_part_$index.zip", $destination);

                if ($zip->open($zipFileName, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
                    throw new Exception("Cannot create zip file: $zipFileName");
                }

                foreach ($chunk as $index => $hash) {
                    $file = $this->hashMap[$hash];
                    if (is_dir($file[0])) {
                        $zip->addEmptyDir($file[1]);
                    } else {
                        $zip->addFile($file[0], $file[1]);
                        $zip->setCompressionName($file[1], ZipArchive::CM_DEFLATE);
                        $zip->setCompressionIndex($index, 9);
                    }
                }

                $zip->close();

                return $zipFileName;
            })->catch(function (Throwable $exception) {
                info(self::class, ['Error : ', $exception->getMessage()]);
            });
        }

        $pool->wait();

        $this->merge($destination, count($chunks));

        return true;
    }

    private function collect($source)
    {
        $files = [];
        $reads = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::LEAVES_ONLY);

        foreach ($reads as $name => $file) {
            if (! $file->isDir()) {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($source) + 1);

                if ($this->isExcluded($relativePath)) {
                    info(self::class, [$relativePath]);

                    continue;
                }

                $hash = sha1($filePath);
                $files[] = $hash;
                $this->hashMap[$hash] = [$filePath, $relativePath];
            }
        }

        return $files;
    }

    private function isExcluded($path)
    {
        foreach ($this->excludedContains as $excludedContain) {
            if (str_contains($path, $excludedContain)) {
                return true;
            }
        }

        foreach ($this->excludedPaths as $excludedPath) {
            if ($path == $excludedPath) {
                return true;
            }
        }

        return false;
    }

    private function merge($destination, $numParts)
    {
        $finalZip = new ZipArchive;

        if ($finalZip->open($destination, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new Exception("Cannot create final zip file: $destination");
        }

        for ($i = 0; $i < $numParts; $i++) {
            $partZipFileName = preg_replace('/\.zip$/', "_part_$i.zip", $destination);
            $partZip = new ZipArchive;

            if ($partZip->open($partZipFileName) === true) {
                for ($j = 0; $j < $partZip->numFiles; $j++) {
                    $file = $partZip->statIndex($j);
                    $finalZip->addFromString($file['name'], $partZip->getFromIndex($j));
                }
                $partZip->close();
                unlink($partZipFileName);
            } else {
                throw new Exception("Cannot open part zip file: $partZipFileName");
            }
        }

        $finalZip->close();
    }
}
