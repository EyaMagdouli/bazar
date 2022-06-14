<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\User;

class Marketplace extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory, SoftDeletes;
    protected $fillable =
    ['name',
    'description',
    'image',
    'accepted'];

    protected $with = ['user'];

    public function product(){
       return $this->hasMany(Product::class);
    }

    public function user(){
       return $this->belongsTo(User::class,'user_id','id');
    }

    public function conversation(){
        return $this->hasMany(Conversation::class);
    }
}
