<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class SignUpController extends Controller {

    public function loginPage() {
        return view("login");
    }
    
    public function signupPage() {
        return view("signup");
    }
    
    public function login() {
        $username = request("username");
        $password = request("password");
        // $user = User::where("email", $email)->first();
        if(!auth()->attempt(["name" => $username, "password" => $password])){
            return redirect("/login/?fail");
        }
        return redirect()->route("desktop");
    }
    
    public function signup() {
        $username = request("username");
        $password = request("password");
        $confirmPassword = request("password_confirmation");
        $email = request("email");

        if($password != $confirmPassword) {
            return redirect("/signup/?fail=password");
        }
        
        try {
            $user = User::create([
                "email" => $email,
                "password" => $password,
                "name" => $username
            ]);
            auth()->login($user);
        } catch (\Exception $e) {
            return redirect("/signup/?fail");
        }
        return redirect()->route("desktop");
    }

    public function signupGuest() {
        // TODO: Implement this in a better way
        $email = "guest" . rand(1000, 9999) . "@example.com";
        $password = rand(100000, 999999);
        $name = "Guest";
        
        try {
            $user = User::create([
                "email" => $email,
                "password" => $password,
                "name" => $name
            ]);
            auth()->login($user);
        } catch (\Exception $e) {
            return redirect("/welcome/?fail");
        }
        return redirect()->route("desktop");
    }


    public function logout() {
        auth()->logout();
        return redirect()->route("login");
    }
}
