<?php

namespace Module\Internal\Commands;

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
}
