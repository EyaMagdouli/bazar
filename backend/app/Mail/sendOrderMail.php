<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class sendOrderMail extends Mailable
{
    use Queueable, SerializesModels;
    protected $order;
    protected $marketplace;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order, $marketplace)
    {
        $this->marketplace = $marketplace;
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->subject('Order')->view('mail')->with([
            'marketplace'=>$this->marketplace,
            'order' => $this->order
        ]);
    }
}
