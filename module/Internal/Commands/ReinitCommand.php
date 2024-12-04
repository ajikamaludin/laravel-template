<?php

namespace Module\Internal\Commands;

use Illuminate\Support\Facades\Artisan;

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
        $this->runShellCommand('php artisan app:remove-modules all');
        $this->runShellCommand('rm -rf ' . base_path('.git'));
        $this->runShellCommand('git init');
        $this->runShellCommand('git add .');
        $this->runShellCommand('git commit -m "reinit project $(basename $(pwd))"');
        $this->runShellCommand('rm -rf .env');
        $this->runShellCommand('cp .env.example .env');
        $this->runShellCommand('rm -rf ' . database_path('database.sqlite'));
        $this->runShellCommand('touch ' . database_path('database.sqlite'));
        $this->runShellCommand('php artisan migrate --seed');

        $this->info('Projects Re-initilize');
        $this->info('Please run : php artisan key:gen');
    }
}
