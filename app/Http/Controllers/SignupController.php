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
        if(!auth()->attempt(["username" => $username, "password" => $password])){
            request()->session()->flash("fail", "Invalid credentials");
            $fail = "Invalid credentials";
            return view("login");
        }
        return redirect()->route("desktop");
    }
    
    public function signup() {
        $username = request("username");
        $password = request("password");
        $confirmPassword = request("password_confirmation");
        $email = request("email");

        if($password != $confirmPassword) {
            request()->session()->flash("fail", "Passwords do not match");
            return view("signup");
        }
        
        try {
            $user = User::create([
                "email" => $email,
                "password" => $password,
                "username" => $username
            ]);
            auth()->login($user);
        } catch (\Exception $e) {
            request()->session()->flash("fail", "Unable to access the database or the username or email is already taken");
            return view("signup");
        }
        return redirect()->route("desktop");
    }

    public function signupGuest() {
        // TODO: Implement this in a better way
        $email = "guest" . rand(1000, 9999) . "@example.com";
        $password = rand(100000, 999999);
        $username = "Guest" . rand(1000, 9999);
        
        $user = User::create([
            "username" => $username,
            "password" => $password,
            "email" => $email,
        ]);
        auth()->login($user);
        try {
        } catch (\Exception $e) {
            request()->session()->flash("fail", "Failed to create a guest account");
            return view("welcome");
        }
        return redirect()->route("desktop");
    }


    public function logout() {
        auth()->logout();
        return redirect()->route("login");
    }
}
