// import models
const InventoryModel = require('../model/inventoryModel');
const ProductModel = require('../model/productModel');
const UserModel = require('../model/userModel');
const WishListModel = require('../model/wishListModel');
const ShoppingCartModel = require('../model/shoppingCartModel');

// // populate db (only need to run once)
// require('../lib/dbData');

class WishListApi {

    createJSONResponse(status, message, data) {
        var json = {};
        json.status = status;
        json.message = message;
        json.data = data;
        return json;
    }

    getWishList(userId, res) {

        const promise =
            // check for user
            UserModel
                .findOne({ _id: userId })
                .then(user => {
                    // user exists
                    // now retrieve users wish list
                    return WishListModel
                        .find({ user: user })
                        .then(wishList => {
                            if(Object.keys(wishList).length === 0) {
                                res.status(404);
                                return this.createJSONResponse("error", "There are no items in your wish list.", null);
                            } else {
                                // wish list exists
                                res.status(200);
                                return this.createJSONResponse("success", "", wishList);
                            }
                        })
                        .catch(err => {
                            res.status(404);
                            // wish list does not exist
                            return this.createJSONResponse("error", "Wish list was not found.", null);
                        });
                })
                .catch(err => {
                    res.status(404);
                    // user does not exist
                    return this.createJSONResponse("error", "User was not found.", null);
                });

        return promise;
    }

    addWishListItem(body, res) { 

        // check body data first
        // validate it is in the
        // correct format
        const promise = new Promise((resolve, reject) => {
            if( 
                !('quantity' in body) || !('productId' in body) || !('userId' in body) ||
                typeof body.quantity === undefined || typeof body.productId === undefined || typeof body.userId === undefined
              ) {
                reject("Bad json response.");
            } else {
                resolve(body);
            }
        });  

        return promise
            .then(body => {
                // check for user
                return UserModel
                    .findOne({ _id: body.userId })
                    .then(user => {
                        // user exists
                        // now check if product exists
                        return ProductModel
                            .findOne({ _id: body.productId })
                            .then(product => {
                                // product exists
                                // now create wish list item
                                return WishListModel
                                    .create({ 
                                        user: user,
                                        product: product,
                                        quantity: body.quantity
                                    })
                                    .then(item => {
                                        // success
                                        res.status(201);
                                        return this.createJSONResponse("success", "Wish list item added.", item);
                                    })
                                    .catch(err => {
                                        // error creating at database level
                                        res.status(500);
                                        return this.createJSONResponse("error", "Wish list item was not added.", null);
                                    })
                            })
                            .catch(err => {
                                // product does not exist
                                res.status(404);
                                return this.createJSONResponse("error", "Product was not found.", null);
                            });
                    })
                    .catch(err => {
                        // user does not exist
                        res.status(404);
                        return this.createJSONResponse("error", "User was not found.", null);
                    });
            })
            .catch(reason => {
                // bad json format
                res.status(400);
                return this.createJSONResponse("error", reason, null);
            });
    }

    deleteWishListItem(itemId, res) {

        const promise =
            // check for item
            WishListModel
                .findById(itemId)
                .then(item => {
                    if(item === null) {
                        res.status(404);
                        return this.createJSONResponse("error", "Wish list item was not found.", null);
                    }
                    const deletedItem = item;
                    // item exists
                    // now delete it
                    return WishListModel
                        .remove({ _id: itemId })
                        .then(item => {
                            res.status(200);
                            return this.createJSONResponse("success", "Item was deleted from wish list", deletedItem);
                        })
                        .catch(err => {
                            res.status(500);
                            // item was not deleted
                            return this.createJSONResponse("error", "Item could not be deleted.", null);
                        });
                })
                .catch(err => {
                    res.status(404);
                    // item does not exist
                    return this.createJSONResponse("error", "Wish list item was not found.", null);
                });

        return promise;
    }

    addWishListItemToCart(itemId, res) {

        const promise =
            // check for item
            WishListModel
                .findById(itemId)
                .then(item => {
                    if(item === null) {
                        res.status(404);
                        return this.createJSONResponse("error", "Wish list item was not found.", null);
                    }
                    // item exists
                    // now create it in shopping cart
                    return ShoppingCartModel
                        .create({ 
                            user: item.user,
                            product: item.product,
                            quantity: item.quantity
                         })
                        .then(item => {
                            res.status(201);
                            return this.createJSONResponse("success", "Item was added to the shopping cart.", item);
                        })
                        .catch(err => {
                            res.status(500);
                            // item was not added
                            return this.createJSONResponse("error", "Item could not be added to the shopping cart.", null);
                        });
                })
                .catch(err => {
                    res.status(404);
                    // item does not exist
                    return this.createJSONResponse("error", "Wish list item was not found.", null);
                });

        return promise;
    }

    updateWishListItemQuantity(itemId, body, res) {

        // check body data first
        // validate it is in the
        // correct format
        const promise = new Promise((resolve, reject) => {
            if( 
                !('quantity' in body) ||
                typeof body.quantity === undefined ||
                !Number.isInteger(body.quantity)
              ) {
                reject("Bad json response.");
            } else {
                resolve(body);
            }
        });  

        return promise
            .then(body => {
                // update wish list item quantity
                return WishListModel
                    .findOneAndUpdate({ _id: itemId }, { $set: { quantity: body.quantity }})
                    .then(item => {
                        // item was updated
                        res.status(200);
                        return this.createJSONResponse("success", "Item was updated.", item);
                    })
                    .catch(err => {
                        // item was not found
                        res.status(404);
                        return this.createJSONResponse("error", "Item was not found.", null);
                    });
            })
            .catch(reason => {
                // bad json format
                res.status(400);
                return this.createJSONResponse("error", reason, null);
            });
    }
}

module.exports = WishListApi;