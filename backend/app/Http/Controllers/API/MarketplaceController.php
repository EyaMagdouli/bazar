<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Marketplace;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class MarketplaceController extends Controller
{

    public function index()
    {
        $user_id = auth()->user()->id;
        $marketplace = Marketplace::where('user_id',$user_id)->get();


        // if ($marketplace) {
            return response()->json([
                'status' => 200,
                'marketplace' => $marketplace
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
            $marketplace->description = $request->input('description');
            $marketplace->user_id = auth()->user()->id;
            //image

            if(request()->hasFile('image')) {
                // Get filename with the extension
                $filenameWithExt = request()->file('image')->getClientOriginalName();
                //Get just filename
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                // Get just ext
                $extension = request()->file('image')->getClientOriginalExtension();
                // Filename to store
                $fileNameToStore = $filename.'_'.time().'.'.$extension;
                // dd(config('filesystems.disks.bazar_files.root'));
                // Upload Image
                $request->file('image')->storeAs('marketplace', $fileNameToStore, 'bazar_files');
                // dd('eee');
                $marketplace->image = $fileNameToStore;
                // $path = request()->file('image')->storeAs(config('filesystems.disks.bazar_files.root').'/product', $fileNameToStore);

                //
            }


            // if (request()->hasFile('image')) {
            //     $file = $request->file('image');
            //     $extension = $file->getClientOriginalExtension();
            //     $fileName =  time() . '.' . $extension;
            //     $file->move('uploads/marketplace/', $fileName);
            //     $marketplace->image = 'uploads/marketplace/' . $fileName;
            // }
            $marketplace->save();
            return response()->json([
                'id' => $marketplace->id,
                'status' => 200,
                'token'=>$token,
                'message' => 'Marketplace added successfully'
            ]);
        }
    }


    public function edit(){
        $user_id = auth()->user()->id;
        $marketplace = Marketplace::where('user_id',$user_id)->get();
        if($marketplace){
            return response()->json([
                'status'=>200,
                'marketplace'=>$marketplace
            ]);

        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>"No marketplace found"
            ]);
        }
    }


    public function update(Request $request){
        $validator= Validator::make($request->all(),[
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors()
            ]);

        }
        else{
            $user_id = auth()->user()->id;
            $marketplace = Marketplace::where('user_id',$user_id)->first();
            if($marketplace){
            $marketplace->name = $request->input('name');
            $marketplace->slug = $request->input('slug');
            $marketplace->description = $request->input('description');

            //image
            if($request->hasFile('image')){
                $path=$marketplace->image;
                if(File::exists($path)){
                    File::delete($path);
                }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName=  time().'.'.$extension;
            $file->move('uploads/marketplace/',$fileName);
            $marketplace->image='uploads/marketplace/'.$fileName;
            }
            $marketplace->update();
            return response()->json([
                'status'=>200,
                'message'=>'Marketplace updated successfully'
            ]);
        }

        else{

            return response()->json([
                'status'=>404,
                'message'=>'Marketplace not found'
            ]);
        }


    }


}
}
