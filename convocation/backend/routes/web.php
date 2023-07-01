<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\regController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('checkRollwithVerification',[regController::class, 'checkRollNo']);
Route::post('saveUserInfoForPayment',[regController::class, 'saveUserInfo']);
Route::post('getApi1Response',[regController::class, 'api1Call']);
Route::post('getApi2Response',[regController::class, 'api2Call']);
Route::post('checkPaymentVerification',[regController::class, 'api4Call']);
Route::get('getToken',[regController::class, 'getToken']);



