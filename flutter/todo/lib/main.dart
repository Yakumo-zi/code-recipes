import 'package:flutter/material.dart';
import 'package:todo/pages/edit_page.dart';
import 'package:todo/pages/home_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const HomePage(),
      routes: {
        '/home': (context) => const HomePage(),
        '/edit': (context) =>
            EditPage(index: ModalRoute.of(context)!.settings.arguments as int),
      },
    );
  }
}
