#include "accum.hpp"
#include <iostream>

int main(int argc, char *argv[]) {

  int num[] = {1, 2, 3, 4, 5};
  std::cout << accum(&num[0], &num[5]) << std::endl;

  char name[] = "templates";
  int length = sizeof(name) - 1;
  std::cout << accum(&name[0], &name[length]) / length << std::endl;

  return 0;
}
