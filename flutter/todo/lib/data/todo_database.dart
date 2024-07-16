import 'package:isar/isar.dart';
import 'package:path_provider/path_provider.dart';
import 'package:todo/model/todo_item.dart';

class TodoDatabase {
  static Isar? isar;
  void mock() {
    for (int i = 0; i < 10; i++) {
      isar!.writeTxnSync(() {
        isar!.todoItems.putSync(TodoItem(
            name: 'name $i',
            id: i,
            date: DateTime.now(),
            isDone: false,
            decription: 'description $i'));
      });
    }
  }

  Future<void> initTodoDatabase() async {
    if (isar != null) {
      return;
    }
    final dir = await getApplicationDocumentsDirectory();
    isar = await Isar.open([TodoItemSchema], directory: dir.path);
  }

  void insertTodo(TodoItem todo) {
    isar!.writeTxnSync(() {
      isar!.todoItems.putSync(todo);
    });
  }

  void deleteTodoById(int id) {
    isar!.writeTxnSync(() {
      isar!.todoItems.deleteSync(id);
    });
  }

  void updateTodo(TodoItem todo) {
    isar!.writeTxnSync(() {
      isar!.todoItems.putSync(todo);
    });
  }

  List<TodoItem> getAlltodoItems() {
    return isar!.todoItems.where().findAllSync();
  }

  TodoItem? getTodoById(int id) {
    return isar!.todoItems.getSync(id);
  }
}
