<div class="grid-container">
    <div class="top-menu__inner top-bar">
        <div class="top-bar-left">
            <div class="top-menu__logo">
                <div class="main-logo main-logo_borderless"></div>
            </div>
            <div class="top-menu__title">{{ config('app.name') }}</div>
        </div>
        <div class="top-bar-right">
            <div>
                @auth
                    <form action="{{ route('logout') }}" method="post">
                        @csrf
                        <button class="button button_rounded secondary">
                            <span class="button__label">{{ __('Logout') }}</span>
                        </button>
                    </form>
                @endauth
            </div>
        </div>
    </div>
</div>
