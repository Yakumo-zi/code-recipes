import 'package:flutter/material.dart';
import 'package:sushi_store/models/food.dart';

class Shop  extends ChangeNotifier{
  final List<Food> _foodMenu = [
    Food(
        name: "Salmon Sushi",
        price: "21.0",
        imagePath: "lib/images/salmon_sushi.png",
        rating: "4.9"),
    Food(
        name: "Tuna",
        price: "23.0",
        imagePath: "lib/images/tuna.png",
        rating: "4.3"),
  ];
  List<Food> _cart = [];

  List<Food> get foodMenu => _foodMenu;
  List<Food> get cart => _cart;

  //add to cart
  void addToCart(Food food,int quality) {
    for (int i=0;i<quality;i++){
      _cart.add(food);
    }
    notifyListeners();
  }

  //remove from cart
  void removeFromCart(Food food) {
    _cart.remove(food);
    notifyListeners();
  }
}
