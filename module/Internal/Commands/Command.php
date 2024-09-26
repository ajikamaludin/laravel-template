<?php

namespace Module\Internal\Commands;

use Illuminate\Console\Command as BaseCommand;
use RuntimeException;
use Symfony\Component\Process\Process;

class Command extends BaseCommand
{
    protected $name = 'base_command';

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
