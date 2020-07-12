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

                        @component('components.input-field', [
                            'classes' => 'login-form__login-email',
                            'type' => 'email',
                            'name' => 'email',
                            'label' => __('Your e-mail'),
                        ])
                        @endcomponent

                        @component('components.input-field', [
                            'classes' => 'login-form__login-password',
                            'type' => 'password',
                            'name' => 'password',
                            'label' => __('Your password'),
                        ])
                        @endcomponent

                        <div class="login-form__submit">
                            @component('components.button', [
                                'classes' => 'login-form__button',
                                'check' => true,
                                'spinner' => 'spinner spinner_donut-multi',
                                'label' => __('Sign in'),
                            ])
                            @endcomponent
                        </div>
                    </form>
                </div>

                <div class="fadeIn animated fast tab tab_register {{ 'register' === $active ? 'tab_active' : ''}}">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        @component('components.input-field', [
                            'classes' => 'login-form__login-name',
                            'type' => 'text',
                            'name' => 'name',
                            'label' => __('Your name'),
                        ])
                        @endcomponent

                        @component('components.input-field', [
                            'classes' => 'login-form__login-email',
                            'type' => 'email',
                            'name' => 'email',
                            'label' => __('Your e-mail'),
                        ])
                        @endcomponent

                        @component('components.input-field', [
                            'classes' => 'login-form__login-password',
                            'type' => 'password',
                            'name' => 'password',
                            'label' => __('Your password'),
                        ])
                        @endcomponent

                        <div class="login-form__submit">
                            @component('components.button', [
                                'classes' => 'login-form__button',
                                'check' => true,
                                'spinner' => 'spinner spinner_donut-multi',
                                'label' => __('Sign up'),
                            ])
                            @endcomponent
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ mix('/js/auth/login.js') }}" async></script>
@endsection
