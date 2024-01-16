#!/bin/lua
function get_sources_file(subfix)
  local f = io.popen("ls", "r")
  if f == nil then
    os.exit(1, true)
  end

  local source = {}
  for line in f:lines() do
    local res = string.match(line, "[a-zA-z0-9]*." .. subfix .. "$")
    if res ~= nil then
      source[#source + 1] = res
    end
  end
  return source
end

for index, value in ipairs(get_sources_file("cc")) do
  print(string.format("index=%s,value=%s", index, value))
end


for index, value in ipairs(get_sources_file("lua")) do
  print(string.format("index=%s,value=%s", index, value))
end
