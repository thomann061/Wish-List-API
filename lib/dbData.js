// import models
const InventoryModel = require('../model/inventoryModel');
const ProductModel = require('../model/productModel');
const UserModel = require('../model/userModel');
const WishListModel = require('../model/wishListModel');
const ShoppingCartModel = require('../model/shoppingCartModel');

// Add Data
var user1 = new UserModel();
user1.username = 'johnDoe';
user1.userEmail = 'test@test.com';

user1.save();

var product1 = new ProductModel();
product1.productId = 0088746;
product1.productDescription = 'Navy Striped Polo T-shirt';
product1.productImageURL = 'http://.....com';

product1.save();

var product2 = new ProductModel();
product2.productId = 0088747;
product2.productDescription = 'Navy Polo T-shirt';
product2.productImageURL = 'https://.....com';

product2.save();

var product3 = new ProductModel();
product3.productId = 0088748;
product3.productDescription = 'Navy T-shirt';
product3.productImageURL = 'https://..com';

product3.save();

var inventory1 = new InventoryModel();
inventory1.product = product1;
inventory1.inventoryStock = 50;
inventory1.inventorySize = 'L';
inventory1.inventoryPrice = 84.00;

inventory1.save();

var inventory2 = new InventoryModel();
inventory2.product = product2;
inventory2.inventoryStock = 100;
inventory2.inventorySize = 'S';
inventory2.inventoryPrice = 80.00;

inventory2.save();

var inventory3 = new InventoryModel();
inventory3.product = product3;
inventory3.inventoryStock = 70;
inventory3.inventorySize = 'M';
inventory3.inventoryPrice = 82.00;

inventory3.save();

var wishListItem1 = new WishListModel();
wishListItem1.user = user1;
wishListItem1.product = product1;
wishListItem1.quantity = 1;

wishListItem1.save();

var wishListItem2 = new WishListModel();
wishListItem2.user = user1;
wishListItem2.product = product2;
wishListItem2.quantity = 2;

wishListItem2.save();

var wishListItem3 = new WishListModel();
wishListItem3.user = user1;
wishListItem3.product = product3;
wishListItem3.quantity = 3;

wishListItem3.save();

var shoppingCartItem = new ShoppingCartModel();
shoppingCartItem.user = user1;
shoppingCartItem.product = product1;
shoppingCartItem.quantity = 10;

shoppingCartItem.save();