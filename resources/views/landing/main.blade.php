@extends('layouts.app')

@section('content')
    <div class="grid-x">
        <div class="top-menu cell">
            @include('landing.header')
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
