const print = @import("std").debug.print;
pub fn main() !void {
    const bytes = "Hello,世界!";
    print("{}\n", .{@TypeOf(bytes)});
    print("{}\n", .{bytes.len});

    print("{c}\n", .{bytes[1]});
}
