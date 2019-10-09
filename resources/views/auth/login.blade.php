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

                <div class="tab tab_login scale-in-down {{ 'login' === $active ? 'tab_active' : ''}}">
                    <form id="login-panel" action="{{ route('login') }}" method="POST">
                        @csrf

                        <div class="input-field login-form__login-email">
                            <input class="input-field__input" type="email" name="email" />
                            <span class="input-field__label">{{ __('Your e-mail') }}</span>
                        </div>

                        <div class="input-field login-form__login-password">
                            <input class="input-field__input" type="password" name="password" />
                            <span class="input-field__label">{{ __('Your password') }}</span>
                        </div>

                        <div class="login-form__submit">
                            <input class="login-form__button button primary button_rounded" type="submit" name="login_submit" value="Sign in"/>
                        </div>
                    </form>
                </div>

                <div class="tab tab_register {{ 'register' === $active ? 'tab_active' : ''}}">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="input-field login-form__login-name">
                            <input class="input-field__input" type="text" name="name" />
                            <span class="input-field__label">{{ __('Your name') }}</span>
                        </div>

                        <div class="input-field login-form__login-email">
                            <input class="input-field__input" type="email" name="email" />
                            <span class="input-field__label">{{ __('Your e-mail') }}</span>
                        </div>

                        <div class="input-field login-form__login-password">
                            <input class="input-field__input" type="password" name="password" />
                            <span class="input-field__label">{{ __('Your password') }}</span>
                        </div>

                        <div class="login-form__submit">
                            <input class="login-form__button button primary button_rounded" type="submit" name="register_submit" value="Sign up"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ mix('/js/auth/login.js') }}" async></script>
@endsection
