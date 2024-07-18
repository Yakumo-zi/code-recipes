package main

import "fmt"

func main() {
	s := "Hello World!"
	s = reverse([]byte(s), 0, len(s)-1)
	fmt.Println(s)
}

func reverse(s []byte, left, right int) string {
	for left < right {
		s[left], s[right] = s[right], s[left]
		left++
		right--
	}
	return string(s)
}
