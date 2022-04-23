<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Marketplace;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MarketplaceController extends Controller
{

    public function index($id)
    {
        $user_id = auth()->user()->id;
        $marketplace = Marketplace::where('user_id',$user_id)->findOrFail($id);


        // if ($marketplace) {
            return response()->json([
                'status' => 200,
                'product' => $marketplace
            ]);
        // } else {
        //     return response()->json([
        //         'status' => 404,
        //         'message' => "No Marketplace found"
        //     ]);
        // }
    }

    public function create(Request $request)
    {
        //return response()->json($request->all());
        //dd(auth()->user()->id);
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'description' => "required",
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,

                'errors' => $validator->errors()
            ]);
        } else {

            $token = $request->token;
           // $user = User::where('remember_token', $token)->first();
            $marketplace = new Marketplace;
            $marketplace->name = $request->input('name');
            $marketplace->slug = $request->input('slug');
            $marketplace->description = $request->input('description');
            $marketplace->user_id = auth()->user()->id;
            //image
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $fileName =  time() . '.' . $extension;
                $file->move('uploads/marketplace/', $fileName);
                $marketplace->image = 'uploads/marketplace/' . $fileName;
            }
            $marketplace->save();
            return response()->json([
                'id' => $marketplace->id,
                'status' => 200,
                'token'=>$token,
                'message' => 'Marketplace added successfully'
            ]);
        }
    }






}
