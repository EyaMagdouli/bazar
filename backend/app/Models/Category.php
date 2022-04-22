<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Category extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'marketplace_id',
        'slug',
    ];


    public function product(){
        return $this->hasMany(Product::class,'category_id', 'id');
    }
    public function marketplace(){
        return $this->belongsTo(Marketplace::class,'marketplace_id', 'id');
    }
}
