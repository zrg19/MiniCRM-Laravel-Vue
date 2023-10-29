<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = array('company');

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::createFromFormat('Y-m-d H:i:s', Carbon::parse($value))->format('Y-m-d')
        );
    }

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public static function filtered()
    {

        return self::
            when(request('search_id'), function ($query) {
                $query->where('id', request('search_id'));
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function($q) {
                    $q->where('first_name', 'like', '%'.request('search_global').'%')
                        ->orWhere('last_name', 'like', '%'.request('search_global').'%')
                        ->orWhere('email', 'like', '%'.request('search_global').'%')
                        ->orWhere('phone', 'like', '%'.request('search_global').'%');
                });
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
    }
}
