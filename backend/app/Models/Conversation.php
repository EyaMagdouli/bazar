<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Message;
use App\Models\User;


class Conversation extends Model
{
    use HasFactory;

    protected $with = ['seller','buyer','product'];

    public function message(){
        $this->hasMany(Message::class);
    }

    public function seller(){
        $this->belongsTo(User::class,'seller_id');
    }
    public function buyer(){
        $this->belongsTo(User::class,'buyer_id');
    }
    public function product(){
        $this->belongsTo(Product::class,'product_id');
    }
}
