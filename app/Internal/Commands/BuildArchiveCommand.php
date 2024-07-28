<?php

namespace App\Internal\Commands;

use App\Internal\Services\ZipService;
use Exception;
use Illuminate\Console\Command;
use RuntimeException;
use Symfony\Component\Process\Process;

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
        $zipName = str_replace(' ', '', basename(base_path())) . '_' . now()->format('dm_His') . '.zip';
        if ($this->option('remove') != 'n') {
            try {
                unlink(base_path($zipName));
            } finally {
                $this->info('Compressed file removed');

                return;
            }
        }

        $runNpmBuild = confirm('Build new assets ?', true);

        $zipService = new ZipService;

        $withRawJs = confirm('Includes resources/js ?', false);
        if (!$withRawJs) {
            $zipService->addExcludedContains('resources/js');
        }

        $withModules = confirm('Includes app/Modules ?', true);
        if (!$withModules) {
            $zipService->addExcludedContains('app/Modules');
        }

        try {
            $startTime = microtime(true);

            if ($runNpmBuild) {
                $this->info('Building new assets files');
                $this->runShellCommands(['npm run build']);
            }

            $this->runShellCommands(['php artisan optimize:clear']);

            spin(fn () => $zipService->create(base_path(), $zipName), 'Zipping files . . . .');

            $endTime = microtime(true);
            $timeTaken = number_format($endTime - $startTime, 2);

            $this->info("Successfuly create compressed zip file: $timeTaken second");
        } catch (Exception $e) {
            $this->error('Error : ' . $e->getMessage());
        }
    }

    /**
     * Run the given commands.
     *
     * @param  array  $commands
     * @return void
     */
    protected function runShellCommands($commands)
    {
        $process = Process::fromShellCommandline(implode(' && ', $commands), null, null, null, null);

        if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
            try {
                $process->setTty(true);
            } catch (RuntimeException $e) {
                $this->output->writeln('  <bg=yellow;fg=black> WARN </> ' . $e->getMessage() . PHP_EOL);
            }
        }

        $process->run(function ($type, $line) {
            $this->output->write('    ' . $line);
        });
    }
}
