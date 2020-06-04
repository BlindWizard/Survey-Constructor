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
                        <button class="button button_rounded primary wide">
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
                <div class="content__buzz">
                    <div class="grid-container">
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
                                    <h3>Research</h3>
                                    <h4>Inspect statistics reports and respond in time.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content__feedback">
                    <div class="content__feedback-background">
                        <div class="grid-container">
                            <div class="grid-x">
                                <div class="cell small-6">
                                    <h3 class="content__feedback-label">Contact Us</h3>
                                    <div class="content__feedback-about">
                                        You have something to tell us? We wait for your opinions and suggestions.
                                        Feel free to send a feedback :)
                                    </div>
                                </div>
                                <div class="cell small-6">
                                    <div class="feedback-form">
                                        <div id="survey-feedback"></div>
                                        <script src="{{ mix('/js/client/loader.js') }}"></script>
                                        <script>
                                            SurveyBoxLoader.runSurvey({
                                                element: 'survey-feedback',
                                                surveyId: '{{ $feedbackFormId }}',
                                                token: '{{ $adminToken }}'
                                            });
                                        </script>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content__footer">
                    <div class="grid-container">
                        <div class="grid-x">
                            <div class="cell small-4">
                                <div class="about">
                                    <div class="about__label">About us</div>
                                    <div class="about__description">
                                        This service created by independent developer.
                                    </div>
                                </div>
                            </div>
                            <div class="cell small-4">
                                <div class="about">
                                    <div class="about__label">Terms of use</div>
                                    <div class="about__description">
                                        This service created by independent developer.
                                    </div>
                                </div>
                            </div>
                            <div class="cell small-4">
                                <div class="footer-menu">
                                    <p class="footer-menu__item">Up</p>
                                    <p class="footer-menu__item">Last changes</p>
                                    <p class="footer_menu__item">Sing in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content__copyright">
                    <div class="grid-container">
                        <h3>
                            ©2020 Survey Box
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
