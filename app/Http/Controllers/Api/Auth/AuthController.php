<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return Response
     */
    public function login(LoginRequest $request)
    {

        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->apiErrorResponse('Authentication Failed', ['Invalid Credentials'], 403);
        }

        $token = $request->user()->createToken($request->userAgent())->plainTextToken;
        $response = ['user' => $request->user(), 'token' => $token];
        return $this->apiSuccessResponse('Successfully', $response);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::guard('api')->logout();

//        $request->session()->invalidate();

        return response()->noContent();

    }
}
