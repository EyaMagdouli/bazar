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

    //the register function
    public function register(Request $request){

        //validation of the inputs
        $validator= Validator::make($request->all(), [
            'kind'=>'required',
            'name'=> 'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'phone_number'=>'required|max:18|min:8',
            'password'=>'required|min:8',
        ]);


        //to check the validation of the inputs
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

            //creating a token of this user named _Token
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json(
                [
                'status'=>200,
                'name'=>$user->name,
                'token'=>$token,
                'message'=>'Registered successfully',
                ]);


        }

    }


    //login function
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|max:191|email',
            'password'=>'required'
        ]);

        //to check if the input is fine or not
        if($validator->fails()){
            dd('hi');
            return response()->json([
                'status'=>401,
                'validation_errors'=>$validator->errors(),
            ]);
        }
        else {
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([   // throwing a validation error
                    'status'=>401,
                    'message'=>'credentials do not match'
                ]);
            }
            else {
                $token = $user->createToken($user->email.'_Token')->plainTextToken;
                $remeber_token = $token;
                $user->remember_token = $remeber_token;
                $user->save();
                return response()->json(
                    [
                    'status'=>200,
                    'name'=>$user->name,
                    'token'=>$token,
                    'kind'=>$user->kind,
                    'message'=>'Logged In successfully',
                    ]);
            }
        }
    }





    //logout function
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        $response = [
            'status'=>true,
            'message'=>'Logged Out successfully',
        ];
        return response($response,201);
    }

}
