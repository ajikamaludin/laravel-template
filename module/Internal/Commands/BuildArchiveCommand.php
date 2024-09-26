<?php

namespace Module\Internal\Commands;

use Module\Internal\Services\ZipService;
use Exception;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\spin;

class BuildArchiveCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:compress {--r|remove=n}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Compress to zip this application to be ready to deploy on hosting panel';

    /**
     * Configure the command.
     */
    protected function configure()
    {
        $this->setAliases(['compress', 'build', 'b', 'zip']);

        parent::configure();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $zipName = str_replace(' ', '', basename(base_path())) . '.zip';
        if ($this->option('remove') != 'n') {
            try {
                unlink(base_path($zipName));
            } finally {
                $this->info('old compressed file removed');

                return;
            }
        }

        $runNpmBuild = confirm('build new assets ?', true);

        $zipService = new ZipService;

        $withRawJs = confirm('includes resources/js ?', false);
        if (!$withRawJs) {
            $zipService->addExcludedContains('resources/js');
        }

        $withModules = confirm('includes module ?', true);
        if (!$withModules) {
            $zipService->addExcludedContains('module');
        }

        try {
            $startTime = microtime(true);

            if ($runNpmBuild) {
                $this->info('building new assets files');
                $this->runShellCommands(['npm run build']);
            }

            $this->runShellCommands(['php artisan optimize:clear']);

            spin(fn() => $zipService->create(base_path(), $zipName), 'Zipping files . . . .');

            $endTime = microtime(true);
            $timeTaken = number_format($endTime - $startTime, 2);

            $this->info("Successfuly create compressed zip file: $timeTaken second");
        } catch (Exception $e) {
            $this->error('Error : ' . $e->getMessage());
        }
    }
}
