@extends('layouts.app')

@section('content')
    <div class="grid-x">
        <div class="top-menu cell">
            <div class="grid-container">
                <div class="top-menu__inner top-bar">
                    <div class="top-bar-left">
                        <div class="top-menu__title">{{ config('app.name') }}</div>
                    </div>
                    <div class="top-bar-right">
                        <div>Easy</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="description cell">
            <div class="grid-container">
                <div class="grid-x grid-margin-x">
                    <div class="cell">
                        <div class="join-block">
                            <h3>EVERYTHING</h3>
                            <h1>YOU NEED TO KNOW</h1>
                            <div>
                                <a href="{{ route('login') }}">{{  __('Join us') }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell">
            <div class="grid-container">
                <div class="grid-x grid-margin-x">
                    <div class="cell">
                        Metrics
                    </div>
                </div>
            </div>
        </div>
        <div class="cell">
            <div class="grid-container">
                Footer
            </div>
        </div>
    </div>
@endsection
