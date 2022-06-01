<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Category extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory, SoftDeletes;

    protected $table = 'categories';
    protected $fillable = [
        'name',
        'marketplace_id',
        'description',
    ];


    public function product(){
        return $this->hasMany(Product::class,'category_id', 'id');
    }
}
