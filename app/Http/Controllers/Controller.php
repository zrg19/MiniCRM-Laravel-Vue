<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function apiSuccessResponse($message, $data = array(), $code = 200) {
        $response = ['success' => true, 'message' => $message, 'data' => $data];

        return response()->json($response, 200);
    }

    protected function apiErrorResponse($message, $errors = array(), $code) {
        $response = ['success' => false, 'message' => $message, 'errors' => $errors];
        return response()->json($response, $code);
    }

}
