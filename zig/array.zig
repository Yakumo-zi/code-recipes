const print = @import("std").debug.print;

pub fn main() void {
    const array = [_]i32{make(3)} ** 10;
    print("{any}\n", .{array});
}

fn make(x: i32) i32 {
    return x + 1;
}
