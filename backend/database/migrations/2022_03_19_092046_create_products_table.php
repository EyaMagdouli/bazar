<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id')->required();
            $table->integer('marketplace_id')->required();
            $table->string('name')->required();
            $table->string('description')->nullable();
            $table->integer('qty')->nullable();
            $table->enum('qtyUnity',['kg','g','t','oz','lb'])->nullable();
            $table->enum('priceUnity',['usd','eur','pound','dt'])->nullable();
            $table->decimal('price')->required();
            $table->string('image')->required();
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
        Schema::dropIfExists('products');
    }
}
