<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\DTO\TemplateObject;
use App\Admin\Exceptions\TemplateNotFoundException;

interface TemplatesFactoryContract
{
    public const BLANK_UUID  = '7b57c7b9-fcb4-4be6-aceb-f4c1990d3021';

    /**
     * @param string $title
     *
     * @return TemplateObject
     *
     * @throws TemplateNotFoundException
     */
    public function getSystemTemplate(string $title): TemplateContract;

    /**
     * @return TemplateObject
     */
    public function getBlank(): TemplateContract;

    /**
     * @param TemplateContract $template
     *
     * @return BlockContract[]
     */
    public function getBlocks(TemplateContract $template): array;
}