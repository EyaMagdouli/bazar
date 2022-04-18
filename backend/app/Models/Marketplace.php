<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\User;

class Marketplace extends Model
{
    use HasFactory;
    protected $fillable =
    ['name',
    'user_id',
    'slug',
    'description',
    'image'];

    protected $with = ['user']; 

    public function product(){
        $this->hasMany(Product::class);
    }

    public function user(){
        $this->belongsTo(User::class);
    }
}
