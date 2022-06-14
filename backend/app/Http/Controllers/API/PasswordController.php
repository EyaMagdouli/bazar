<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use App\Mail\forgotPasswordMail;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailer;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PasswordController extends Controller
{
    public function forgot(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'required|max:191|email|exists:users',
        ]);
        // dd($request->input('email'));
        $email = $request->input('email');
        $user = User::where('email',$email)->first();
        if($user){

        $token = Str::random(12);

        DB::table('password_resets')->insert([
            'email' =>$email,
            'token' =>$token
        ]);

        Mail::to($email)->send(new forgotPasswordMail($token));
        return response([
            'status' => 200,
            'message' => 'Check your email!'
        ]);
    }
    else {
        return response([
            'status' => 404,
            'message' => 'Email does not exist'
        ]);
    }
    }


    public function reset(ResetPasswordRequest $request){
        $passwordReset= DB::table('password_resets')->where('token',$request->input('token'))->first();

        if(!$user = User::where('email', $passwordReset->email)->first()){
            throw new NotFoundHttpException('User not found');
        }
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return response([
            'status'=> 200
        ]);
    }
}
