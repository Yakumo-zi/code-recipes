cmake_minimum_required(VERSION 3.20)

project(chapter1)
set(CMAKE_CXX_STANDARD 20)
aux_source_directory(${PROJECT_SOURCE_DIR} SOURCES)

add_executable(chapter1 ${SOURCES})

target_link_libraries(chapter1 PUBLIC pthread)
