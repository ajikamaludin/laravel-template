<?php

namespace App\Internal\Commands;

use Illuminate\Console\Command;
use RuntimeException;
use Symfony\Component\Process\Process;

class ReinitCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Re init projects';

    /**
     * Configure the command.
     */
    protected function configure()
    {
        $this->setAliases(['init', 'reinit']);

        parent::configure();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->runShellCommands([
            'php artisan app:remove-modules all',
            'rm -rf ' . base_path('.git'),
            'git init',
            'git add .',
            'git commit -m "reinit project $(basename $(pwd))"',
            'rm -rf .env',
            'cp .env.example .env',
            'rm -rf ' . database_path('database.sqlite'),
            'touch ' . database_path('database.sqlite'),
            'php artisan key:gen',
            'php artisan migrate --seed',
        ]);

        $this->info('Projects Re-initilize');
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
