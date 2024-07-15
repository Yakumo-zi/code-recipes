import 'package:todo/model/todo.dart';

class TodoDatabase {
  final _todos = <Todo>[
    Todo(
        id: 1,
        name: 'Buy Milk',
        date: DateTime.now(),
        decription: 'Buy 2 liters of milk',
        isDone: false),
    Todo(
        id: 2,
        name: 'Buy Bread',
        date: DateTime.now(),
        decription: 'Buy 2 loaves of bread',
        isDone: false),
    Todo(
        id: 3,
        name: 'Buy Eggs',
        date: DateTime.now(),
        decription: 'Buy 1 dozen eggs',
        isDone: false),
  ];

  List<Todo> get todos => _todos;
  void add(Todo todo) {
    _todos.add(todo);
  }

  void remove(int id) {
    _todos.removeWhere((element) => element.id == id);
  }

  void update(Todo todo) {
    var index = _todos.indexWhere((element) => element.id == todo.id);
    _todos[index] = todo;
  }
}
