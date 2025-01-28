<?php

namespace App\Http\Controllers;

use App\Models\DarkwebProduct;
use App\Models\Pivots\DarkwebTransaction;
use App\Service\GameService;

class DarkwebController extends Controller {
    public function getAllItems() {
        $items = DarkwebProduct::with('owners')
        ->where('level_criteria', '<=', auth()->user()->gameProgress->level)
        ->get()
        ->map(function($item) {
            $item->isOwned = $item->owners->contains('id', auth()->id());
            return $item;
        })
        ->makeHidden('owners');
        return response()->json($items);
    }

    public function buyItem() {
        $productId = request('productId');
        $transaction = DarkwebTransaction::where('user_id', auth()->id())
        ->where('product_id', $productId);
        if($transaction->exists()) {
            return response()->json(['error' => 'Product already bought'], 400);
        }
        $product = DarkwebProduct::find($productId);
        if(!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        $gameService = new GameService();
        if ($gameService->hasMoney($product->price) === false) {
            return response()->json(['error' => 'Not enough money'], 400);
        }
        if ($gameService->isTooLowLevel($product->level_criteria)) {
            return response()->json(['error' => 'Level too low'], 400);
        }
        if ($gameService->isTooMuchSus($product->sus)) {
            return response()->json(['error' => 'Too much sus'], 400);
        }
        $gameService->withdraw($product->price);
        $gameService->addSus($product->sus);
        auth()->user()->darkwebProducts()->attach($product->id, [
            'day' => auth()->user()->gameProgress->day,
            'price' => $product->price,
            'sus' => $product->sus
        ]);
        return response()->json(['message' => 'Item bought']);
    }
}
