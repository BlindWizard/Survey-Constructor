<button class="button primary button_rounded button_submit {{ $classes }}">
    @if(isset($check) && true === $check)
        <span class="check-icon">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <polyline class="check-icon__check" fill="none" stroke="#fafafa" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
            </svg>
        </span>
    @endisset
    @isset($spinner)
        <span class="{{ $spinner }}"></span>
    @endisset
    <span class="button__label">{{ $label }}</span>
</button>