#ifndef ACCUM_HPP
#define ACCUM_HPP

template <typename T> struct AccumulationTratis {};

template <> struct AccumulationTratis<char> {
  using AccT = int;
  AccT value = {};
};
template <> struct AccumulationTratis<int> {
  using AccT = long;
  AccT value = {};
};
template <> struct AccumulationTratis<short> {
  using AccT = int;
  AccT value = {};
};

template <typename T>

decltype(AccumulationTratis<T>::value) accum(T const *beg, T const *end) {
  using AccT = typename AccumulationTratis<T>::AccT;
  AccT total{};
  while (beg != end) {
    total += *beg;
    ++beg;
  }
  return total;
}

#endif
