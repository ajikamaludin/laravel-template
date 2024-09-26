<?php

namespace Module\Internal\Commands;

use Module\Internal\Services\SettingService;

class SettingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-setting';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync any changes SYSTEM in SettingConstant';

    /**
     * Configure the command.
     */
    protected function configure()
    {
        $this->setAliases(['sync-setting', 'synst', 'st']);

        parent::configure();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        [$to_add, $to_delete] = SettingService::new()->sync();
        $this->info('Setting synced : ' . count($to_add) . ' added, ' . count($to_delete) . ' deleted');
    }
}
