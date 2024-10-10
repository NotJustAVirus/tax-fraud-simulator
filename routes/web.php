<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('desktop');
});

Route::get('/login', function () {
    return view('login');
});
