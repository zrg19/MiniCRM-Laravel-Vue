<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'login'])->name('auth.login');

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::apiResource('companies', CompanyController::class);
    Route::get('/companiesForDropdown', [CompanyController::class, 'getCompaniesForDropdown'])->name('companies.dropdown');
    Route::post('/companies/{company}', [CompanyController::class, 'update'])->name('companies.post.update');
    Route::apiResource('employees', EmployeeController::class);
    Route::get('/user', [ProfileController::class, 'user']);
    Route::put('/user', [ProfileController::class, 'update']);
    Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');

});
