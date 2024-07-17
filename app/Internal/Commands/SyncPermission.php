<?php

namespace App\Internal\Commands;

use App\Internal\Services\PermissionServices;
use Illuminate\Console\Command;

class SyncPermission extends Command
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
    protected $description = 'Sync any changes LIST PermissionConst and attach to `admin` role is exists';

    /**
     * Configure the command.
     */
    protected function configure()
    {
        $this->setAliases(['sync-permission', 'syncp', 'sp']);

        parent::configure();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        [$to_add, $to_delete] = PermissionServices::new()->sync();
        $this->info('Permission synced : ' . count($to_add) . ' added, ' . count($to_delete) . ' deleted');
    }
}
