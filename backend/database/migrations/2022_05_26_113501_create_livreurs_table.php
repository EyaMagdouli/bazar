<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLivreursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('livreurs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->required()->nullable();
            $table->string('email')->required()->nullable();
            $table->text('description')->required()->nullable();
            $table->string('delivery_time')->required()->nullable();
            $table->string('payment')->required()->nullable();
            $table->string('phone_number')->required()->nullable();
            $table->enum('status',['activated','desactivated'])->default('activated')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('livreurs');
    }
}
