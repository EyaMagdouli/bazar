<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Message;
use App\Models\User;


class Conversation extends Model
{
    use HasFactory;



    public function message(){
        $this->hasMany(Message::class);
    }

    public function user(){
        $this->belongsTo(User::class);
    }
}
