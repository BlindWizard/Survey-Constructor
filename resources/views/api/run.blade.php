@extends('layouts.app')

@section('content')
    <div id="app"></div>
    <script src="{{ mix('/js/client/loader.js') }}"></script>
    <script>
        SurveyBoxLoader.init('app', '{{ $id }}');
    </script>
@endsection
