<?php

namespace Module\Internal\Commands;

use Illuminate\Console\Command;
use Module\Internal\Services\PermissionService;

class PermissionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-permission';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync any changes LIST in PermissionConstant and attach to `admin` role is exists';

    /**
     * Configure the command.
     */
    protected function configure(): void
    {
        $this->setAliases(['sync-permission', 'syncp', 'sp']);

        parent::configure();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        [$to_add, $to_delete] = PermissionService::new()->sync();
        $this->info('Permission synced : '.count($to_add).' added, '.count($to_delete).' deleted');
    }
}
