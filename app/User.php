<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use DateTime;

/**
 * @property string   $id
 * @property string   $name
 * @property string   $email
 * @property DateTime $email_verified_at
 * @property string   $password
 * @property string   $remember_token
 * @property DateTime $created_at
 * @property DateTime $updated_at
 */
class User extends Authenticatable
{
    public const ATTR_ID = 'id';

    use Notifiable;

    public $incrementing = false;


    protected static function boot() {
        parent::boot();

        static::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::generate()->string;
        });
    }

    /**
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'email', 'password',
    ];

    /**
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at'        => 'datetime',
        'updated_at'        => 'datetime',
    ];
}
