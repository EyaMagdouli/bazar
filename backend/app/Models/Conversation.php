<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conversation extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable =
    ['client_id',
    'marketplace_id'];

    protected $with = ['client', 'marketplace'];

    public function client(){
        return $this->belongsTo(User::class, 'client_id');
    }

    public function marketplace(){
        return $this->belongsTo(Marketplace::class, 'marketplace_id');
    }

    public function message(){
        return $this->hasMany(Message::class);
    }

    public function cart(){
        return $this->belongsTo(Cart::class, 'conversation_id');
    }
}
