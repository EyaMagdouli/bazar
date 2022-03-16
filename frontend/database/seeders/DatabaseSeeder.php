<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([

            'name' => 'admin',
            'kind' =>'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('secret')
        ]);
        // \App\Models\User::factory(10)->create();
    }
}
