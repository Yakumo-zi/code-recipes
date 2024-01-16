#!/bin/lua

local a = "one string"
local b = string.gsub(a, "one", "another")

print(b)

print("string length:" .. #b)


print([[
<html>
  <head>
    <tittle>An html page</tittle>
  </head>
  <body>
  <a href="http://www.lua.org">Lua</a>
  </body>
</html>
]])
