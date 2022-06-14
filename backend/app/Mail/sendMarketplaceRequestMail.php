<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class sendMarketplaceRequestMail extends Mailable
{
    use Queueable, SerializesModels;
    protected $marketplace;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($marketplace)
    {
        $this->marketplace = $marketplace;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Marketplace request')->view('marketplaceRequestMail')->with([
            'marketplace'=>$this->marketplace,
        ]);
    }
}
