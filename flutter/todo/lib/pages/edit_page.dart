import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:todo/data/todo_database.dart';
import 'package:todo/model/todo.dart';

class EditPage extends StatefulWidget {
  final int index;
  const EditPage({super.key, required this.index});

  @override
  State<EditPage> createState() => _EditPageState();
}

class _EditPageState extends State<EditPage> {
  final TodoDatabase db = TodoDatabase();
  late Todo todo;
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
    log("Saving todo: ${todo.name} ${todo.decription} ${todo.date} ${todo.isDone} ${todo.id}");
    db.update(todo);
    Navigator.pop(context);
  }

  @override
  void initState() {
    super.initState();
    todo = db.todos[widget.index];
    nameController.text = todo.name;
    descriptionController.text = todo.decription;
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
      body: Container(
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
      ),
    );
  }
}
