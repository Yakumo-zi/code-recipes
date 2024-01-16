#!/bin/lua

local a = {}
a[1] = 1
a[2] = 2

for i, v in ipairs(a) do
  print(i .. " " .. v)
end
print(#a)


for line in io.lines("./table.lua") do
  table.insert(a, line)
end


for i, v in ipairs(a) do
  print(i .. " " .. v)
end
