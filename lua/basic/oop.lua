Rectangle = { area = 0, length = 0, width = 0 }

function Rectangle:new(obj, length, width)
  obj = obj or {}
  setmetatable(obj, self)
  self.__index = self
  self.length = length
  self.width = width
  self.area = self.length * self.width
  return obj
end

function Rectangle:printArea()
  print(self.width)
end

r = Rectangle:new({}, 10, 20)

print(r.area)
