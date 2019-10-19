@extends('layouts.app')

@section('content')
    <div id="app"></div>
    <script>window.settings = '{!! $settings !!}';</script>
    <script src="{{ mix('/js/admin/app.js') }}"></script>
@endsection
