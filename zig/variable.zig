const std = @import("std");

pub fn main() !void {
    var variable: u16 = 0;
    variable = 16;

    std.debug.print("variable {}\n", .{variable});

    const constant: u16 = 666;
    std.debug.print("constant {}\n", .{constant});

    var y: i32 = 123;

    const x = blk: {
        y += 1;
        break :blk y;
    };

    std.debug.print("x {}\n", .{x});
}
