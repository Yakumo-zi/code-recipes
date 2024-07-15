import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';

class Todotile extends StatelessWidget {
  final String name;
  final DateTime date;
  final bool isDone;
  final Function(bool?)? onChange;
  final VoidCallback deleteTodo;
  final VoidCallback editTodo;
  const Todotile(
      {super.key,
      required this.name,
      required this.isDone,
      required this.onChange,
      required this.date,
      required this.deleteTodo,
      required this.editTodo});

  @override
  Widget build(BuildContext context) {
    return Slidable(
      endActionPane: ActionPane(motion: const ScrollMotion(), children: [
        SlidableAction(
          onPressed: (context) {
            deleteTodo();
          },
          icon: Icons.delete,
          label: 'Delete',
          backgroundColor: Colors.red,
          foregroundColor: Colors.white,
        ),
        SlidableAction(
            onPressed: (context) {
              editTodo();
            },
            borderRadius: const BorderRadius.only(
              topRight: Radius.circular(8),
              bottomRight: Radius.circular(8),
            ),
            icon: Icons.edit,
            label: 'Edit',
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white),
      ]),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: const BoxDecoration(
          color: Colors.yellow,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(8),
            bottomLeft: Radius.circular(8),
          ),
        ),
        child: Row(
          children: [
            Checkbox(
              value: isDone,
              onChanged: onChange,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    decoration: isDone
                        ? TextDecoration.lineThrough
                        : TextDecoration.none,
                  ),
                ),
                Text(
                  // format date to YYYY-MM-DD
                  '${date.year}-${date.month}-${date.day}',
                  style: const TextStyle(
                    fontSize: 12,
                    color: Colors.grey,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
