<?php

namespace App\Models;

use App\Listeners\NotifyCompanyCreation;
use App\Mail\NewCompanyAdd;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;

class Company extends Model
{
    use HasFactory;

    use Notifiable;


    protected $guarded = [];


    //https://laravel.com/docs/10.x/eloquent-mutators
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::createFromFormat('Y-m-d H:i:s', Carbon::parse($value))->format('Y-m-d')
        );
    }


    public static function filtered()
    {
        return self::
            when(request('search_id'), function ($query) {
                $query->where('id', request('search_id'));
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function($q) {
                    $q->where('name', 'like', '%'.request('search_global').'%')
                        ->orWhere('email', 'like', '%'.request('search_global').'%')
                        ->orWhere('website', 'like', '%'.request('search_global').'%');

                });
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
    }

    public function sendCompanyAddNotification()
    {
        if ($this->email)
            Mail::to($this->email)->send(new NewCompanyAdd($this));
    }
}
