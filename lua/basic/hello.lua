#!/bin/lua

function fact(n)
  if n == 0 then
    return 1
  else
    return n * fact(n - 1)
  end
end

print("enter a number:")

local number = io.read("*n")

print(fact(number))


-- 多行注释 只需要在前方添加一个 '-' 即可运行代码
--[[
print("comment")
--]]
