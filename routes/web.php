<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignUpController;

Route::get('/', function () {return view('desktop');})->name('desktop')->middleware('auth');

Route::get('/login', [SignUpController::class, 'loginPage'])->name('login')->middleware('guest');
Route::post('/login', [SignUpController::class, 'login'])->middleware('guest');
Route::get('/signup', [SignUpController::class, 'signUpPage'])->name('signUp')->middleware('guest');
Route::post('/signup', [SignUpController::class, 'signUp'])->middleware('guest');
Route::post('/logout', [SignUpController::class, 'logout'])->middleware('auth');
