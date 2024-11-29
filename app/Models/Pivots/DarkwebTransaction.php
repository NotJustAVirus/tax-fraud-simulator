<?php

namespace App\Models\Pivots;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class DarkwebTransaction extends Pivot
{
    use HasFactory;

    protected $table = 'darkweb_transactions';
    protected $fillable = [
        'price',
        'sus',
        'day',
    ];

    public function product() {
        return $this->belongsTo(DarkwebProduct::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
