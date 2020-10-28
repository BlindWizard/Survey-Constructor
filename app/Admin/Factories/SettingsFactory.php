<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\ActionContract;
use App\Admin\Contracts\Entities\ActionDataContract;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\DataContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Factories\SettingsFactoryContract;
use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Admin\Database\Models\BlockData;
use App\Admin\Models\Locale;
use App\Admin\Models\Settings;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class SettingsFactory implements SettingsFactoryContract
{
    /** @var ApiTokenRepositoryContract */
    protected $apiTokenRepository;

    /** @var BlockFactoryContract */
    protected $blockFactory;

    public function __construct(ApiTokenRepositoryContract $apiTokenRepository, BlockFactoryContract $blockFactory)
    {
        $this->apiTokenRepository = $apiTokenRepository;
        $this->blockFactory = $blockFactory;
    }

    /**
     * @inheritDoc
     */
    public function getSettings(): Settings
    {
        $tokens = $this->apiTokenRepository->getUsersTokens(Auth::user()->getAuthIdentifier());
        if (count($tokens) > 0) {
            $token = Arr::first($tokens)->getValue();
        }
        else {
            $token = null;
        }

        $settings = new Settings();
        $settings->csrf = csrf_token();
        $settings->token = $token;

        $locale = new Locale();
        $locale->appName = config('app.name');
        $locale->move = __('Move');
        $locale->margin = __('Margin');
        $locale->padding = __('Padding');
        $locale->resize = __('Resize');
        $locale->edit = __('Edit');
        $locale->save = __('Save');
        $locale->delete = __('Delete');
        $locale->dropPlaceholder = __('Drop here');
        $settings->locale = $locale;

        foreach (BlockContract::TYPES as $type) {
            $settings->defaultBlockData[$type] = $this->blockFactory->getEmptyBlock($type);
        }

        foreach (ActionContract::TYPES as $type => $label) {
            $settings->actionsTypes[$type] = __($label);
        }

        foreach (ActionDataContract::HANDLES as $type => $label) {
            $settings->actionsHandles[$type] = __($label);
        }

        foreach (DataContract::TYPES as $type => $label) {
            $settings->dataTypes[$type] = $label;
        }

        return $settings;
    }
}