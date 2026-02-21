<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;

Route::apiResource('articles', ArticleController::class)->only(['index', 'show', 'store']);

Route::post('articles/{article}/comments', [CommentController::class, 'store']);