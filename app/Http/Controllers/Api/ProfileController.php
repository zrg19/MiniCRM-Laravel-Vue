<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * @param UpdateProfileRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateProfileRequest $request)
    {
        $profile = Auth::user();
        $profile->name = $request->name;
        $profile->email = $request->email;

        if ($profile->save()) {
            return $this->apiSuccessResponse('User updated', $profile);;
        }
        return $this->apiErrorResponse('UU: Something went wrong', [], 403);
    }

    public function user(Request $request)
    {
        $user = $request->user()->get(['id', 'name', 'email'])->first();

        return $this->apiSuccessResponse('User found', $user);
    }
}
