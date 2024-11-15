<?php

namespace App\Http\Controllers;

use App\Models\DarkwebProduct;

class DarkwebController extends Controller {
    public function getAllItems() {
        $items = DarkwebProduct::all();
        return response()->json($items);
    }

    public function buyItem() {
        $productId = request('productId');
        throw new \Exception('Not implemented');
    }
}
