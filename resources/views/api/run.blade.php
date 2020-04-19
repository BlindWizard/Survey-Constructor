@extends('layouts.app')

@section('content')
    <div class="app__wrapper grid-container fluid">
        <div class="grid-x grid-margin-x">
            <div id="app" class="app cell medium-offset-2 medium-8"></div>
        </div>
    </div>

    <script src="{{ mix('/js/client/loader.js') }}"></script>
    <script>
        SurveyBoxLoader.runSurvey({
            element: 'app',
            surveyId: '{{ $id }}',
            token: '{{ $token }}'
        });
    </script>
@endsection
