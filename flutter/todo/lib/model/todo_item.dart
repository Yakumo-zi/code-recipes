import 'package:isar/isar.dart';
part 'todo_item.g.dart';
@Collection()
class TodoItem {
  Id id = Isar.autoIncrement;
  String name;
  DateTime date;
  String decription;
  bool isDone;

  TodoItem(
      {required this.name,
      required this.id,
      required this.date,
      required this.isDone,
      required this.decription});
}