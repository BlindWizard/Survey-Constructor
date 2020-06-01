@extends('layouts.app')

@section('content')
    <div class="grid-x">
        <div class="top-menu top-menu_transparent cell">
            @include('landing.header')
        </div>
        <div class="description cell">
            <div class="join-block">
                <h1>CUSTOMIZABLE FORMS</h1>
                <h3>FOR SURVEYS, POLLS AND FEEDBACKS</h3>
                <div class="join-block__button">
                    <a href="{{ route('login') }}">
                        <button class="button button_rounded primary">
                            <span class="button__label">{{ __('SEE MORE') }}</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
        <div class="content-wrapper cell">
            <div class="content">
                <div class="content__about">
                    <h4>Create your beautiful forms and start collecting meanings of your auditory.</h4>
                </div>
                <div content="content__buzz">
                    <div content="grid-container">
                        <div content="grid-x">
                            <div class="cell small-4">
                                <div class="buzz buzz_list"></div>
                            </div>
                            <div class="cell small-4">
                                <div class="buzz buzz_chat"></div>
                            </div>
                            <div class="cell small-4">
                                <div class="buzz buzz_data"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="footer__feedback-form"></div>
                </div>
            </div>
        </div>
    </div>
@endsection
