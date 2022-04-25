<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Marketplace;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {

        $user_id = auth()->user()->id;
        $profile = User::where('id', $user_id)->get();

        return response()->json([
            'status' => 200,
            'profile' => $profile,
        ]);
    }
    public function edit()
    {


        $user_id = auth()->user()->id;
        $user = User::where('id', $user_id)->get();
        return response()->json([
            'status' => 200,
            'user' => $user
        ]);
    }


    public function update(Request $request){


            $user_id = auth()->user()->id;

            $user = User::where('id', $user_id)->first();

            if($user){
                $user->email = $request->input('email');
                $user->name = $request->input('name');
                $user->phone_number = $request->input('phone_number');
               // $user->password = $request->input('password');
                $user->update();
                return response()->json([
                    'status'=>200,
                    'message'=>'User updated successfully'
                ]);
            }






}
}
