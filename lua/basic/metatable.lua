#!/bin/lua

-- local mytable = { name = "name" } -- 普通表
--
-- local metatable = {}
--
-- setmetatable(mytable, metatable)

local mytable = { baidu = 'baidu' }

local t = setmetatable({}, { __index = mytable })

--[[
  如果 t 中没有baidu这个类型，那么Lua就会在t的metatable中的__index键中查找，
  如果__index包含的是一个table，那么Lua
  会在这个table中寻找baidu这个类型，如果还是没有则返回nil
--]]
-- print(t.baidu)   -- 'baidu'
--
-- print(t.tencent) -- nil

local t = setmetatable({ baidu = 'baidu' }, {
  __index = function(t, k)
    if k == 'tencent' then
      return 'metatable tencent'
    elseif k == 'baidu' then
      return 'metatable baidu'
    else
      return 'no exist'
    end
  end
})

-- print(t.baidu) -- 'baidu'
-- print(t.tencent) --'metatable tencent'
-- print(t.test) 'no exist'

-- __newindex 对于表中不存在的index 会调用元表的方法 如果存在那么会直接给该index赋值
local mytable = setmetatable({ baidu = 'baidu' }, {
  __newindex = function(mytable, key, value)
    rawset(mytable, key, "\"" .. value .. "\"")
  end
})
mytable.ali = 'Ali'
mytable.age = 28
-- print(mytable.ali)
-- print(mytable.age)


local mytable = setmetatable({ 1, 2, 3 }, {
  __add = function(t1, t2)
    local sum = 0
    for _, value in ipairs(t1) do
      sum = sum + value
    end
    for _, value in ipairs(t2) do
      sum = sum + value
    end
    return sum
  end
})

local test_table = { 1, 2, 3 }
local res = mytable + test_table

-- print(res)
