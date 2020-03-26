@extends('layouts.app')

@section('content')
    <div id="app"></div>
    <script src="{{ mix('/js/client/loader.js') }}"></script>
    <script>
        SurveyBoxLoader.runSurvey('app', '{{ $id }}');
    </script>
@endsection
