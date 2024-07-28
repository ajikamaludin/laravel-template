<?php

namespace App\Internal\Commands;

use Illuminate\Console\Command;
use RuntimeException;
use Symfony\Component\Process\Process;

class RemoveModuleCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:remove-modules {module}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'remove any module';

    /**
     * Configure the command.
     */
    protected function configure()
    {
        $this->setAliases(['rm', 'module']);

        parent::configure();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $module = $this->argument('module');
        if ($module != 'all') {
            $this->runShellCommands(['rm -rf '.app_path('Modules/'.$module)]);
            $this->runShellCommands(['rm -rf '.resource_path('js/Pages/'.$module)]);

            $this->info('Removed Module');

            return;
        }

        $modules = [
            'CustomForm',
            'Shortlink',
        ];

        $this->runShellCommands(['rm -rf '.app_path('Modules')]);
        foreach ($modules as $module) {
            $this->runShellCommands(['rm -rf '.resource_path('js/Pages/'.$module)]);
        }

        $this->info('Removed Modules');
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
                $this->output->writeln('  <bg=yellow;fg=black> WARN </> '.$e->getMessage().PHP_EOL);
            }
        }

        $process->run(function ($type, $line) {
            $this->output->write('    '.$line);
        });
    }
}
