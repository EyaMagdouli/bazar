<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Marketplace;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory,SoftDeletes;

    protected $table ='products';
    protected $fillable =
    ['name',
    'marketplace_id',
    'category_id',
    'image',
    'qty',
    'unity',
    'price'];


    protected $with =  ['category','marketplace'];
    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function marketplace(){
        return $this->belongsTo(Marketplace::class, 'marketplace_id', 'id');
    }

   // public function setImageAttribute($value)
//{

        //$attribute_name = "image";
       // $disk = "bazar_files";
       // $destination_path = "/product";


    //    Storage::disk('bazar_files')->put('product/'.request()->file('image')->getClientOriginalName(), 'Contents');
//dd('dd');
       // $this->uploadFileToDisk($value, $attribute_name, $disk, $destination_path);

// return $this->attributes[{$attribute_name}]; // uncomment if this is a translatable field
//}
}
