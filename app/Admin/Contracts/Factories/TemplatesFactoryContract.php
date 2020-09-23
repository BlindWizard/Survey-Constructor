<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\DTO\Template;
use App\Admin\Exceptions\TemplateNotFoundException;

interface TemplatesFactoryContract
{
    public const BLANK_UUID  = '7b57c7b9-fcb4-4be6-aceb-f4c1990d3021';
    public const POLL_UUID = '97f0245d-d5a9-4489-bf69-7dd4f60142ef';

    /**
     * @param string $title
     *
     * @return Template
     *
     * @throws TemplateNotFoundException
     * @throws \Throwable
     */
    public function getSystemTemplate(string $title): TemplateContract;

    /**
     * @return Template
     *
     * @throws \Throwable
     */
    public function getBlank(): TemplateContract;

    /**
     * @return Template
     *
     * @throws \Throwable
     */
    public function getPoll(): TemplateContract;
}