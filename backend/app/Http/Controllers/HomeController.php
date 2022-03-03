<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function redirect(){
        if(Auth::check())
        {
            return redirect(backpack_url('dashboard'));
        }
        return redirect(backpack_url('login'));
    }
}
