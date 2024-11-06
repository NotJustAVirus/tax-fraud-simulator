<?php

namespace App\Http\Controllers;

use App\Models\DarkwebProduct;

class DarkwebController extends Controller {
    public function getAllItems() {
        $items = DarkwebProduct::all();
        return response()->json($items);
    }

    public function buyItem($id) {
        throw new \Exception('Not implemented');
    }
}
