<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignUpController;

Route::get('/', function () {return view('desktop');})->name('desktop')->middleware('auth');

Route::get('/welcome', function () {return view('welcome');})->name('login')->middleware('guest');
Route::get('/login', [SignUpController::class, 'loginPage'])->name('realLogin')->middleware('guest');
Route::get('/signup', [SignUpController::class, 'signupPage'])->name('signup')->middleware('guest');

Route::post('/login', [SignUpController::class, 'login'])->middleware('guest');
Route::post('/signup', [SignUpController::class, 'signup'])->middleware('guest');
Route::post('/signupGuest', [SignUpController::class, 'signupGuest'])->middleware('guest');
Route::post('/logout', [SignUpController::class, 'logout'])->middleware('auth');
