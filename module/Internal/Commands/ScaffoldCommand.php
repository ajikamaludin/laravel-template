<?php

namespace Module\Internal\Commands;

use Module\Internal\Generators\ScaffoldGenerator;
use Module\Internal\Rules\PascalCase;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\select;

class ScaffoldCommand extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:scaffold {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate file for scaffold';

    /**
     * Configure the command.
     */
    protected function configure()
    {
        $this->setAliases(['scaffold', 'gen', 'sc']);

        parent::configure();
    }

    /**
     * Prompt for missing input arguments using the returned questions.
     *
     * @return array<string, string>
     */
    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'model' => 'Name of model to generate scaffold e.g. User',
        ];
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $model = $this->argument('model'); //input must CamelCase

        $validator = Validator::make(
            ['model' => $model],
            ['model' => ['required', new PascalCase]]
        );

        if ($validator->fails()) {
            $this->error('Validation failed: ' . $validator->errors()->first('model'));

            return 1;
        }

        $scaffold = new ScaffoldGenerator($model);

        if ($scaffold->isModelKeywordAllowed()) {
            $this->error('Error: model name can not in reserved keywords');

            return 1;
        }

        if (!$scaffold->isModelExists()) {
            $_ = $scaffold->withCreateModelClass(
                $this,
                $_ = confirm("App\Models\\" . $scaffold->Model . ' does not exist, create it ?')
            );
        }

        $_ = $scaffold->withProtectedAdminAccess(
            $_ = confirm('Only admin allowed ?')
        );

        $type = select(
            label: 'Which type to generate ?',
            options: ['Scaffold Modal', 'Scaffold Page', 'Single Page'],
            default: 'Scaffold Modal',
        );

        $result = match ($type) {
            'Scaffold Modal' => $scaffold->ScaffoldModal(),
            'Scaffold Page' => $scaffold->ScaffoldPage(),
            'Single Page' => $scaffold->ScaffoldSinglePage(),
        };

        if ($result) {
            $this->info('Scaffold generated successfully');
        } else {
            $this->error('Scaffold generated failed');
        }

        return 0;
    }
}
