cmake_minimum_required(VERSION 3.0)
project(template)
set(CMAKE_CXX_STANDARD 17)

aux_source_directory(./src TARGETS)
aux_source_directory(./src/lib SRC)
include_directories(./include)

foreach(f ${TARGETS})
  get_filename_component(name ${f} NAME_WE)
  add_executable(${name} ${f} ${SRC})
endforeach()






