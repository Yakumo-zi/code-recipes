import 'package:flutter/material.dart';
import 'package:todo/components/todo_tile.dart';
import 'package:todo/data/todo_database.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TodoDatabase db = TodoDatabase();
  onCheckboxChanged(bool? value, index) {
    setState(() {
      db.todos[index].isDone = value!;
    });
  }

  void deleteTodo(index) {
    setState(() {
      db.todos.removeAt(index);
    });
  }

  void gotoEditPage(index) {
    Navigator.pushNamed(context, '/edit', arguments: index);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.yellow,
        titleTextStyle: const TextStyle(
          color: Colors.black,
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ),
        title: const Text('Home Page'),
        elevation: 2,
      ),
      body: Container(
        padding: const EdgeInsets.all(5),
        color: Colors.yellow[100],
        child: ListView.builder(
          itemCount: db.todos.length,
          itemBuilder: (context, index) {
            var todo = db.todos[index];
            return Column(
              children: [
                Todotile(
                    name: todo.name,
                    isDone: todo.isDone,
                    onChange: (value) => onCheckboxChanged(value, index),
                    deleteTodo: () => deleteTodo(index),
                    editTodo: () => gotoEditPage(index),
                    date: todo.date),
                const SizedBox(
                  height: 10,
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
