<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image', 512)->nullable();
            $table->string('video')->nullable();
            $table->integer('total_time')->nullable();
            $table->integer('preparation_time')->nullable();
            $table->integer('rest_time')->nullable();
            $table->integer('cooking_time')->nullable();
            $table->string('title_reference')->nullable();
            $table->string('episode_reference')->nullable();
            $table->text('description_reference')->nullable();
            $table->string('logo_platform_reference')->nullable();
            $table->string('logo_platform_url_reference')->nullable();
            $table->string('image_recipe_reference', 512)->nullable();
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
