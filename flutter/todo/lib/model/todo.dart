class Todo {
  final int id;
  String name;
  DateTime date;
  String decription;
  bool isDone;

  Todo(
      {required this.name,
      required this.id,
      required this.date,
      required this.isDone,
      required this.decription});
}
