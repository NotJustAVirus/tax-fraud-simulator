<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignUpController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\DarkwebController;
use App\Http\Controllers\FormController;

Route::get('/image/{path?}', function () {
    return response()->file(public_path('image/placeholder.png'));
})->where('path', '.*');

Route::get('/', function () {return view('desktop');})->name('desktop')->middleware('auth');

Route::get('/welcome', function () {return view('welcome');})->name('login')->middleware('guest');
Route::get('/login', [SignUpController::class, 'loginPage'])->name('realLogin')->middleware('guest');
Route::get('/signup', [SignUpController::class, 'signupPage'])->name('signup')->middleware('guest');

Route::post('/login', [SignUpController::class, 'login'])->middleware('guest');
Route::post('/signup', [SignUpController::class, 'signup'])->middleware('guest');
Route::post('/signupGuest', [SignUpController::class, 'signupGuest'])->middleware('guest');
Route::post('/logout', [SignUpController::class, 'logout'])->middleware('auth');

Route::get('/gamestate', [GameController::class, 'getState'])->middleware('auth');
Route::post('/gamestate', [GameController::class, 'updateState'])->middleware('auth');

Route::get('/darkweb', [DarkwebController::class, 'getAllItems'])->middleware('auth');
Route::post('/darkweb/buy', [DarkwebController::class, 'buyItem'])->middleware('auth');

Route::get('/form', [FormController::class, 'getForms'])->middleware('auth');
Route::get('/form/answers', [FormController::class, 'getFormAnswers'])->middleware('auth');
Route::get('/form/{id}', [FormController::class, 'getForm'])->middleware('auth');
Route::post('/form/{id}', [FormController::class, 'submitForm'])->middleware('auth');
Route::post('/fax/update', [FormController::class, 'updateFax'])->middleware('auth');

Route::get('/finance', [GameController::class, 'getFinance'])->middleware('auth');