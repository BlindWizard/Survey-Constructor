<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Models\Locale;
use App\Admin\Models\Settings;

class SettingsFactory implements SettingsFactoryContract
{
    /** @var BlockFactoryContract */
    protected $blockFactory;

    public function __construct(BlockFactoryContract $blockFactory)
    {
        $this->blockFactory = $blockFactory;
    }

    /**
     * @inheritDoc
     */
    public function getSettings(): Settings
    {
        $settings = new Settings();
        $settings->csrf = csrf_token();

        $locale = new Locale();
        $locale->appName = config('app.name');
        $locale->editLabel = __('Edit');
        $locale->saveLabel = __('Save');
        $locale->deleteLabel = __('Delete');
        $settings->locale = $locale;

        foreach (BlockContract::TYPES as $type) {
            $settings->defaultBlockData[$type] = $this->blockFactory->getEmptyBlock($type);
        }

        return $settings;
    }
}