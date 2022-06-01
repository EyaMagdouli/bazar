<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('carts')){
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->required();
            $table->integer('product_id')->required();
            $table->integer('conversation_id')->required();
           // $table->decimal('product_qty');
            $table->timestamps();
            $table->softDeletes();

        });

    }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
