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
    'slug',
    'description'];


    public function product(){
        $this->hasMany(Product::class);
    }

    public function user(){
        $this->belongsTo(User::class);
    }
}
