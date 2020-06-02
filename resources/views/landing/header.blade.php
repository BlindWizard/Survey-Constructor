<div class="grid-container">
    <div class="grid-x grid-padding-x">
        <div class="cell">
            <div class="top-menu__inner top-bar">
                <div class="top-bar-left">
                    <div class="top-menu__logo">
                        <div class="main-logo main-logo_borderless"></div>
                    </div>
                    <div class="top-menu__title">{{ config('app.name') }}</div>
                </div>
                <div class="top-bar-right">
                    <div>
                        <button class="button button_rounded transparent">
                            <span class="button__label">{{ __('Features') }}</span>
                        </button>
                        <button class="button button_rounded transparent">
                            <span class="button__label">{{ __('How to use') }}</span>
                        </button>
                        <button class="button button_rounded transparent">
                            <span class="button__label">{{ __('Contact us') }}</span>
                        </button>
                        @auth
                            <form class="top-menu__auth-form" action="{{ route('logout') }}" method="post">
                                @csrf
                                <button class="button button_rounded secondary">
                                    <span class="button__label">{{ __('Logout') }}</span>
                                </button>
                            </form>
                        @else
                            <a href="{{ route('login') }}">
                                <button class="button button_rounded primary">
                                    <span class="button__label">{{ __('Sign in') }}</span>
                                </button>
                            </a>
                        @endauth
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
