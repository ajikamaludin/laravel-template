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
        Schema::create('links', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->string('name');
            $table->string('code');
            $table->text('real_link');
            $table->integer('visit_count')->default(0);
            $table->timestamp('last_visited_at')->nullable();
            $table->string('bot_protection')->nullable();
            $table->string('bot_link')->nullable();

            $table->ulid('user_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
