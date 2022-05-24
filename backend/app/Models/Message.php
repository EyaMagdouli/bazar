<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Conversation;
use Carbon\Carbon;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['message', 'sender_id', 'receiver_id', 'marketplace_id'];


    protected $with =  ['sender', 'receiver'];
    public function sender()
    {
        return $this->belongsTo(User::class);
    }
    public function receiver()
    {
        return $this->belongsTo(User::class);
    }


}
