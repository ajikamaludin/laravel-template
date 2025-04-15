<?php

namespace Module\Internal\Commands;

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
            $this->runShellCommands(['rm -rf ' . base_path('module/' . $module)]);
            $this->runShellCommands(['rm -rf ' . resource_path('js/pages/' . $module)]);

            $this->info('Removed Module');

            return;
        }

        $modules = [
            'custom-form' => 'CustomForm',
            'shortlink' => 'Shortlink',
        ];

        foreach ($modules as $key => $module) {
            $this->runShellCommands(['rm -rf ' . base_path('module/' . $module)]);
            $this->runShellCommands(['rm -rf ' . resource_path('js/pages/' . $key)]);
        }

        $this->runShellCommands(['rm -rf ' . base_path('module/routes.php')]);
        $this->info('Removed Modules');
    }
}
