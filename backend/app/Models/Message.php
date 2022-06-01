<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Conversation;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = ['message', 'sender_id', 'receiver_id', 'conversation_id'];


    protected $with =  ['sender', 'receiver', 'conversation'];
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id' , 'id');
    }
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id' , 'id');
    }

    public function conversation(){
        return $this->belongsTo(Conversation::class, 'conversation_id','id');
    }


}
