@extends('layouts.app')

@section('content')
    <div class="grid-x grid-padding-x login-page__wrapper">
        <div class="login-form__wrapper small-8 small-offset-2 medium-4 medium-offset-4">
            <div class="login-form grid-container">
                <div class="login-form__logo">
                    <div class="main-logo"></div>
                </div>

                <div class="tabs-selector tabs-selector_login-form">
                    <div class="tabs-selector__item {{ 'login' === $active ? 'tabs-selector__item_active' : ''}} tabs-select__item_login ">{{ __('Sign in') }}</div>
                    <div class="tabs-selector__item {{ 'register' === $active ? 'tabs-selector__item_active' : ''}} tabs-select__item_register">{{ __('Sign up') }}</div>
                </div>

                <div class="fadeIn animated fast tab tab_login {{ 'login' === $active ? 'tab_active' : ''}}">
                    <form id="login-panel" action="{{ route('login') }}" method="POST">
                        @csrf

                        <div class="input-field login-form__login-email">
                            <input class="input-field__input" type="email" name="email" />
                            <span class="input-field__label">{{ __('Your e-mail') }}</span>
                            <span class="input-field__error error error_email"></span>
                        </div>

                        <div class="input-field login-form__login-password">
                            <input class="input-field__input" type="password" name="password" />
                            <span class="input-field__label">{{ __('Your password') }}</span>
                            <span class="input-field__error error error_password"></span>
                        </div>

                        <div class="login-form__submit">
                            <button class="login-form__button button primary button_rounded button_submit">
                                <span class="check-icon">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                        <polyline class="check-icon__check" fill="none" stroke="#fafafa" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                                    </svg>
                                </span>
                                <span class="spinner spinner_donut-multi"></span>
                                <span class="button__label">Sign in</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div class="fadeIn animated fast tab tab_register {{ 'register' === $active ? 'tab_active' : ''}}">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="input-field login-form__login-name">
                            <input class="input-field__input" type="text" name="name" />
                            <span class="input-field__label">{{ __('Your name') }}</span>
                            <span class="input-field__error error error_name"></span>
                        </div>

                        <div class="input-field login-form__login-email">
                            <input class="input-field__input" type="email" name="email" />
                            <span class="input-field__label">{{ __('Your e-mail') }}</span>
                            <span class="input-field__error error error_email"></span>
                        </div>

                        <div class="input-field login-form__login-password">
                            <input class="input-field__input" type="password" name="password" />
                            <span class="input-field__label">{{ __('Your password') }}</span>
                            <span class="input-field__error error error_password"></span>
                        </div>

                        <div class="login-form__submit">
                            <button class="login-form__button button primary button_rounded button_submit">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ mix('/js/auth/login.js') }}" async></script>
@endsection
