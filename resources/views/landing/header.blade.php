<div class="grid-container">
    <div class="top-menu__inner top-bar">
        <div class="top-bar-left">
            <div class="top-menu__title">{{ config('app.name') }}</div>
        </div>
        <div class="top-bar-right">
            <div>
                @if (Auth::check())
                    <form action="{{ route('logout') }}" method="post">
                        @csrf
                        <button class="button button_rounded secondary">
                            <span class="button__label">Logout</span>
                        </button>
                    </form>
                @endif
            </div>
        </div>
    </div>
</div>
