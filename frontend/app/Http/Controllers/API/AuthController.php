<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Contracts\Service\Attribute\Required;
use Throwable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
class AuthController extends Controller
{
    public function register(Request $request){

        $validator= Validator::make($request->all(), [
            'name'=> 'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'phone_number',
            'password'=>'required|min:8',
        ]);

        if($validator->fails()  ){
            return response()->json([
                'validation_errors'=>$validator->errors(),
            ]);
        }
        else {
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'phone_number'=>$request->phone_number,
                'kind'=>isset($request->kind) ? $request->kind : "simpleUser",
                'password'=>Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json(
                [
                'status'=>200,
                'name'=>$user->name,
                'token'=>$token,
                'message'=>'whoooopiiiie',
                ]);


        }

    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required',
            'password'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->errors(),
            ]);
        }
        else {
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'message'=>'credentials do not match'
                ]);
            }
            else {
                $token = $user->createToken($user->email.'_Token')->plainTextToken;
                return response()->json(
                    [
                    'status'=>200,
                    'name'=>$user->name,
                    'token'=>$token,
                    'message'=>'whoooopiiiie login',
                    ]);
            }
        }
    }


    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        $response = [
            'status'=>true,
            'message'=>'Logout successfully',
        ];
        return response($response,201);
    }

}
