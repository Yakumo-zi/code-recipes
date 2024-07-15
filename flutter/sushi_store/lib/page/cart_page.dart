import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sushi_store/models/food.dart';
import 'package:sushi_store/models/shop.dart';

class CartPage extends StatelessWidget {
  const CartPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<Shop>(
        builder: (context, value, child) => Scaffold(
              appBar: AppBar(
                title: const Text("My Cart",
                    style: TextStyle(color: Colors.white)),
                backgroundColor: Colors.red.shade400,
              ),
              body: ListView.builder(
                itemCount: value.cart.length,
                itemBuilder: (context, index) {
                  final Food food = value.cart[index];
                  final String foodName = food.name;
                  final String foodPrice = food.price.toString();
                  return Container(
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 196, 133, 133),
                      borderRadius: BorderRadius.circular(5),
                    ),
                    margin: const EdgeInsets.only(left: 10, right: 10, top: 5),
                    child: ListTile(
                      title: Text(
                        foodName,
                        style: const TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      subtitle: Text(
                        foodPrice,
                        style: TextStyle(color: Colors.grey[200]),
                      ),
                      trailing: IconButton(
                        icon: Icon(Icons.delete, color: Colors.grey[300]),
                        onPressed: () => value.removeFromCart(food),
                      ),
                    ),
                  );
                },
              ),
            ));
  }
}
