<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Conversation;


class Message extends Model
{
    use HasFactory;

    protected $with = ['conversation'];
    public function conversation(){
        $this->belongsTo(Conversation::class);
   }

}
