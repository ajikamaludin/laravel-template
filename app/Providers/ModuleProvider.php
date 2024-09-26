<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

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
                    \Module\Internal\Commands\BuildArchiveCommand::class,
                    \Module\Internal\Commands\PermissionCommand::class,
                    \Module\Internal\Commands\ReinitCommand::class,
                    \Module\Internal\Commands\RemoveModuleCommand::class,
                    \Module\Internal\Commands\ScaffoldCommand::class,
                    \Module\Internal\Commands\SettingCommand::class
                ]
            );
        }
    }
}
