import 'package:flutter/material.dart';
import 'package:todo/components/todo_tile.dart';
import 'package:todo/data/todo_database.dart';
import 'package:todo/model/todo_item.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  TodoDatabase db = TodoDatabase();
  List<TodoItem> todos = [];

  onCheckboxChanged(bool? value, TodoItem todo) {
    setState(() {
      todo.isDone = value!;
      db.updateTodo(todo);
    });
  }

  void deleteTodo(int id) {
    setState(() {
      db.deleteTodoById(id);
    });
  }

  void gotoEditPage(int id) async {
    await Navigator.pushNamed(context, '/edit', arguments: id);
    setState(() {
      todos = db.getAlltodoItems();
    });
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
      body: FutureBuilder(future: () async {
        await db.initTodoDatabase();
        todos = db.getAlltodoItems();
        if (todos.isEmpty) {
          db.mock();
          todos = db.getAlltodoItems();
        }
        return todos;
      }(), builder: (context, snapshot) {
        return Container(
          padding: const EdgeInsets.all(5),
          color: Colors.yellow[100],
          child: ListView.builder(
            itemCount: todos.length,
            itemBuilder: (context, index) {
              var todo = todos[index];
              return Column(
                children: [
                  Todotile(
                      name: todo.name,
                      isDone: todo.isDone,
                      onChange: (value) =>
                          onCheckboxChanged(value, todos[index]),
                      deleteTodo: () => deleteTodo(todos[index].id),
                      editTodo: () => gotoEditPage(todos[index].id),
                      date: todo.date),
                  const SizedBox(
                    height: 10,
                  ),
                ],
              );
            },
          ),
        );
      }),
    );
  }
}
