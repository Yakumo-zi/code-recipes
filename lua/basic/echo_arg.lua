#!/bin/lua

print("script name:" .. arg[0])
for i, v in ipairs(arg) do
  print(i .. " " .. v)
end
