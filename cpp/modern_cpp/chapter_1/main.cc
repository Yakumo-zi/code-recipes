#include <iostream>
#include <thread>

void routine() { std::cout << "thread_routine" << std::endl; }

int main() {
  std::cout << "Hello World" << std::endl;
  std::cout << "Thread begin" << std::endl;
  std::thread t{routine};
  t.join();
  std::cout << "Thread end" << std::endl;
  return 0;
}
