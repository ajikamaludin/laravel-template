<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Module\Internal\Commands\BuildArchiveCommand;
use Module\Internal\Commands\PermissionCommand;
use Module\Internal\Commands\ReinitCommand;
use Module\Internal\Commands\RemoveModuleCommand;
use Module\Internal\Commands\ScaffoldCommand;
use Module\Internal\Commands\SettingCommand;

class ModuleProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void {}

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (file_exists(base_path('module/Internal/Commands'))) {
            $this->commands(
                [
                    BuildArchiveCommand::class,
                    PermissionCommand::class,
                    ReinitCommand::class,
                    RemoveModuleCommand::class,
                    ScaffoldCommand::class,
                    SettingCommand::class,
                ]
            );
        }
    }
}
