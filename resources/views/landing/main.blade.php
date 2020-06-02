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
                <div class="content__buzz grid-container">
                    <div class="grid-x grid-padding-x">
                        <div class="cell small-4">
                            <div class="advance advance_list">
                                <div class="buzz buzz_list"></div>
                                <h3>Create</h3>
                                <h4>Create and place embeddable responsive widget for your website.</h4>
                            </div>
                        </div>
                        <div class="cell small-4">
                            <div class="advance advance_list">
                                <div class="buzz buzz_chat"></div>
                                <h3>Collaborate</h3>
                                <h4>Talk to your auditory and collect yours clients impressions.</h4>
                            </div>
                        </div>
                        <div class="cell small-4">
                            <div class="advance advance_list">
                                <div class="buzz buzz_data"></div>
                                <h3>Inspect</h3>
                                <h4>Research statistics reports and respond in time.</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid-container content__footer full">
                    <div class="grid-x">
                        <div class="cell small-6">
                            <div class="about">
                                <div class="about__label">About us</div>
                                <div class="about__description">
                                    Whatta fuck is this.
                                </div>
                            </div>
                        </div>
                        <div class="cell small-6">
                            <div class="feedback-form"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
