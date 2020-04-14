<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\AddTokenCommand;
use App\Admin\Commands\DeleteTokenCommand;
use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Queries\GetAllUsersTokens;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\CreateTokenRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    /** @var SettingsFactoryContract  */
    protected $settings;

    public function __construct(SettingsFactoryContract $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @throws \Throwable
     */
    public function index()
    {
        return view('admin.main', ['settings' => $this->settings->getSettings()->toJson()]);
    }

    public function addToken(CreateTokenRequest $request, AddTokenCommand $command)
    {
        $command->userId = Auth::user()->getAuthIdentifier();
        $command->name = $request->getName();

        $response = new AjaxResponse();
        $response->data = $command->perform()->getResult();

        return response()->json($response);
    }

    public function deleteToken(Request $request, DeleteTokenCommand $command)
    {
        $command->userId = Auth::user()->getAuthIdentifier();
        $command->tokenId = request()->post('id');

        $response = new AjaxResponse();
        $command->perform();

        return response()->json($response);
    }

    public function getAvailableTokens(GetAllUsersTokens $query)
    {
        $query->userId = Auth::user()->getAuthIdentifier();

        $response = new AjaxResponse();
        $response->data = $query->perform()->getResult();

        return response()->json($response);
    }
}