package main

func main() {

}

func intersection(nums1 []int, nums2 []int) []int {
	if len(nums1) == 0 || len(nums2) == 0 {
		return []int{}
	}
	resMap := make(map[int]int)
	for i := 0; i < len(nums1); i++ {
		resMap[nums1[i]]++
	}
	res := make([]int, 10)
	for i := 0; i < len(nums2); i++ {
		_, ok := resMap[nums2[i]]
		if ok {
			res = append(res, nums2[i])
		}
	}
	return res
}
