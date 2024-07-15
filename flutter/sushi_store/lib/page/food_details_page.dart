import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:sushi_store/components/button.dart';
import 'package:sushi_store/models/food.dart';
import 'package:sushi_store/models/shop.dart';

class FoodDetailsPage extends StatefulWidget {
  final Food food;
  const FoodDetailsPage({super.key, required this.food});

  @override
  State<FoodDetailsPage> createState() => _FoodDetailsPageState();
}

class _FoodDetailsPageState extends State<FoodDetailsPage> {
  int quantityCount = 0;
  void decrementQuantity() {
    if (quantityCount > 0) {
      setState(() {
        quantityCount--;
      });
    }
  }

  void incrementQuantity() {
    setState(() {
      quantityCount++;
    });
  }

  void addToCart() {
    if (quantityCount > 0) {
      final shop = context.read<Shop>();
      shop.addToCart(widget.food, quantityCount);
      showDialog(
          context: context,
          barrierDismissible: false,
          builder: (context) => AlertDialog(
                backgroundColor: Colors.red.shade900,
                content: const Text(
                  "Successfully added to cart",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
                actions: [
                  IconButton(
                      onPressed: () {
                        Navigator.pop(context);
                        Navigator.pop(context);
                      },
                      icon: const Icon(Icons.done, color: Colors.white))
                ],
              ));
    }
  }

  @override
  void initState() {
    super.initState();
    final shop = context.read<Shop>();
    quantityCount =
        shop.cart.where((element) => element.name == widget.food.name).length;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        foregroundColor: Colors.grey[900],
      ),
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 25),
              child: ListView(
                children: [
                  Image.asset(
                    widget.food.imagePath,
                    height: 200,
                  ),
                  const SizedBox(
                    height: 25,
                  ),
                  Row(
                    children: [
                      Icon(
                        Icons.star,
                        color: Colors.yellow[900],
                      ),
                      const SizedBox(
                        width: 10,
                      ),
                      Text(
                        widget.food.rating,
                        style: TextStyle(
                            color: Colors.grey[600],
                            fontWeight: FontWeight.bold),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    widget.food.name,
                    style: GoogleFonts.dmSerifDisplay(fontSize: 28),
                  ),
                  const SizedBox(
                    height: 25,
                  ),
                  Text(
                    "Description",
                    style: TextStyle(
                      color: Colors.grey[900],
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                      "This is a delicious food that you will love to eat again and again. It is made with the best ingredients and the best chefs in the world. You will love it. Trust me. It is the best food you will ever eat.,This is a delicious food that you will love to eat again and again. It is made with the best ingredients and the best chefs in the world. You will love it. Trust me. It is the best food you will ever eat.,This is a delicious food that you will love to eat again and again. It is made with the best ingredients and the best chefs in the world. You will love it. Trust me. It is the best food you will ever eat.",
                      style: TextStyle(
                          color: Colors.grey[600], height: 2, fontSize: 14)),
                ],
              ),
            ),
          ),
          Container(
            decoration: BoxDecoration(
                color: Colors.red.shade500,
                borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(40),
                    topRight: Radius.circular(40))),
            padding: const EdgeInsets.only(top: 25, left: 30, right: 30),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "\$${widget.food.price}",
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    ),
                    Row(
                      children: [
                        Container(
                          decoration: BoxDecoration(
                            color: Colors.red.shade900,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: IconButton(
                            icon: const Icon(Icons.remove),
                            color: Colors.white,
                            onPressed: () {
                              decrementQuantity();
                            },
                          ),
                        ),
                        const SizedBox(
                          width: 5,
                        ),
                        SizedBox(
                          width: 40,
                          child: Center(
                            child: Text(
                              quantityCount.toString(),
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 18,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(
                          width: 5,
                        ),
                        Container(
                          decoration: BoxDecoration(
                            color: Colors.red.shade900,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: IconButton(
                            icon: const Icon(Icons.add),
                            color: Colors.white,
                            onPressed: () {
                              incrementQuantity();
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(
                  height: 25,
                ),
                MyButton(
                  text: "Add to cart",
                  onTap: addToCart,
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
