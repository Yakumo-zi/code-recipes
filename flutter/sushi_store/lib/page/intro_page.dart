import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sushi_store/components/button.dart';

class IntroPage extends StatelessWidget {
  const IntroPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.red.shade300,
        body: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Text("SUSHI MAN",
                  style: GoogleFonts.dmSerifDisplay(
                      fontSize: 28, color: Colors.white)),
              const SizedBox(height: 25),
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(50.0),
                  child: Image.asset("lib/images/salmon_eggs.png"),
                ),
              ),
              Text(
                "THE TASTE OF JAPANESE FOOD",
                style: GoogleFonts.dmSerifDisplay(
                    fontSize: 44, color: Colors.white),
              ),
              const SizedBox(height: 25.0),
              Text(
                  "Feel the taste of the most popular Japanese food from anywhere and anytime",
                  style: TextStyle(height: 2, color: Colors.grey.shade300)),

              const SizedBox(height: 25.0),
              MyButton(text: "GET STARTED",onTap: (){
                Navigator.pushNamed(context, "/menupage");
              },),
            ],
          ),
        ));
  }
}
