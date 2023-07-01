<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userInfo extends Model
{
    protected $table = 'userinfo';
    protected $fillable = ['rollno'];
    use HasFactory;
}
