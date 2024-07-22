#include <iostream>
#include <type_traits>
#include <typeinfo>

template <typename T1, typename T2> auto max1(T1 lhs, T2 rhs) {
  return lhs < rhs ? rhs : lhs;
}
template <typename RT, typename T1, typename T2> RT max(T1 lhs, T2 rhs) {
  return lhs < rhs ? rhs : lhs;
}

// C++ 11版本
// 如果T1，T2是引用类型，那么返回值就也有可能被推断为引用类型
// 所以需要使用decay之后的类型T，而不是T&，使用类型萃取std::decay将
// T中的基本类型提取出来
template <typename T1, typename T2>
auto max11(T1 lhs, T2 rhs) ->
    typename std::decay<decltype(true ? lhs : rhs)>::type {
  return lhs > rhs ? lhs : rhs;
}

template <typename T1, typename T2>
typename std::common_type<T1, T2>::type max11c(T1 lhs, T2 rhs) {
  return lhs > rhs ? lhs : rhs;
}

template <typename T> void output_type_value(T args) {
  std::cout << "Type:" << typeid(args).name() << " Value:" << args << std::endl;
}

int main() {
  output_type_value(::max<double>(66, 044));
  output_type_value(::max1(66.0, 44));
  output_type_value(::max11(66.0, 44));
  output_type_value(::max11c(66.0, 44));
  return 0;
}
