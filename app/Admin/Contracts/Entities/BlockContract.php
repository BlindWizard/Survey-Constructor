<?php


namespace App\Admin\Contracts\Entities;

interface BlockContract
{
    public const TYPES = [self::TYPE_OPTION, self::TYPE_OPTIONS_LIST];

    public const TYPE_OPTION = 'option';
    public const TYPE_OPTIONS_LIST = 'options_list';

    /**
     * @return string
     */
    public function getId(): string;

    /**
     * @return string
     */
    public function getSurveyId(): string;

    /**
     * @param string $surveyId
     */
    public function setSurveyId(string $surveyId): void;

    /**
     * @return string
     */
    public function getType(): string;

    /**
     * @return int
     */
    public function getPosition(): int;

    /**
     * @param int $position
     */
    public function setPosition(int $position): void;
}