<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Marketplace;

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
    'price'];


    protected $with =  ['category','marketplace'];
    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function marketplace(){
        return $this->belongsTo(Marketplace::class, 'marketplace_id', 'id');
    }
}
