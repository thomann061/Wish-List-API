const express = require('express');
const router = express.Router();
const wlapi = require('../lib/wishListApi');
const WishListApi = new wlapi();

/**
 * Get current user's wish list
 */
router.get('/:userId', function(req, res, next) {
    const promise = WishListApi.getWishList(req.params.userId, res);

    // handle promise
    promise
        .then(data => {
            res.json(data);
        });
});

/**
 * Add product to current user's wish list
 */
router.post('/$', function(req, res, next) {
    const promise = WishListApi.addWishListItem(req.body, res);

    // handle promise
    promise
        .then(data => {
            res.json(data);
        });
});

/**
 * Delete current users wish list item
 */
router.delete('/:itemId', function(req, res, next) {
    const promise = WishListApi.deleteWishListItem(req.params.itemId, res);
    
    // handle promise
    promise
        .then(data => {
            res.json(data);
        });
});

/**
 * Add wish list item to shopping cart
 */
router.post('/:itemId', function(req, res, next) {
    const promise = WishListApi.addWishListItemToCart(req.params.itemId, res);
    
    // handle promise
    promise
        .then(data => {
            res.json(data);
        });
});

/**
 * Update wish list items quantity
 */
router.put('/:itemId', function(req, res, next) {
    const promise = WishListApi.updateWishListItemQuantity(req.params.itemId, req.body, res);
    
    // handle promise
    promise
        .then(data => {
            res.json(data);
        });
});

module.exports = router;