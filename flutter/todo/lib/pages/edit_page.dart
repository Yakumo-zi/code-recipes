import 'package:flutter/material.dart';
import 'package:todo/data/todo_database.dart';
import 'package:todo/model/todo_item.dart';

class EditPage extends StatefulWidget {
  final int id;
  const EditPage({super.key, required this.id});

  @override
  State<EditPage> createState() => _EditPageState();
}

class _EditPageState extends State<EditPage> {
  TodoDatabase db = TodoDatabase();
  late TodoItem todo;
  final TextEditingController nameController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  void changeName() {
    todo.name = nameController.text;
  }

  void changeDescription() {
    todo.decription = descriptionController.text;
  }

  void onSave() {
    todo.date = DateTime.now();
    db.updateTodo(todo);
    Navigator.pop(context);
  }

  @override
  void initState() {
    super.initState();
    nameController.addListener(changeName);
    descriptionController.addListener(changeDescription);
  }

  @override
  void dispose() {
    super.dispose();
    nameController.dispose();
    descriptionController.dispose();
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
        title: const Text('Edit Page'),
        elevation: 2,
      ),
      body: FutureBuilder(future: () async {
        await db.initTodoDatabase();
        var todo = db.getTodoById(widget.id)!;
        return todo;
      }(), builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
        todo = snapshot.data as TodoItem;
        nameController.text = todo.name;
        descriptionController.text = todo.decription;
        return Container(
          padding: const EdgeInsets.all(5),
          color: Colors.yellow[100],
          child: Column(
            children: [
              TextField(
                controller: nameController,
                decoration: const InputDecoration(
                  labelText: 'Name',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              SizedBox(
                height: 300,
                child: TextField(
                  textAlign: TextAlign.start,
                  maxLines: null,
                  minLines: null,
                  expands: true,
                  controller: descriptionController,
                  decoration: const InputDecoration(
                    labelText: 'Description',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  ElevatedButton(
                    onPressed: onSave,
                    child: const Text('Save'),
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    child: const Text('Cancel'),
                  ),
                ],
              )
            ],
          ),
        );
      }),
    );
  }
}
