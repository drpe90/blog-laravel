<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    
    public function run(): void
    {
        Article::factory(5)
            ->has(Comment::factory(3))
            ->create();
    }
}
