<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class SignUpController extends Controller {

    public function loginPage() {
        return view ("login");
    }
    
    public function signUpPage() {
        throw new \Exception("Please implement the signupPage method");
        return view ("signup");
    }
    
    public function login() {
        // $username = request("username");
        // $password = request("password");
        // // $user = User::where("email", $email)->first();
        // // if(auth()->attempt(["email" => $email, "password" => $password])){
        // if(auth()->login($username, $password)){
        //     return redirect("/");
        // }
        // return view("login");
    }
    
    public function signUp() {
        throw new \Exception("Please implement the signup method");
        $email = request("email");
        $password = request("password");
        $name = request("name");
        
        try {
            $user = User::create([
                "email" => $email,
                "password" => $password,
                "name" => $name
            ]);
            auth()->login($user);
        } catch (\Exception $e) {
            return redirect("/signup/?fail");
        }
        return redirect("/");        
    }


    public function logout() {
        auth()->logout();
        return redirect("/login");
    }
}
