package benchmark

import (
	"math"
	"math/rand"
	"runtime"
	"slices"
	"testing"
)

var data []int

func init() {
	const dataSize = 1000 * 1000
	data = make([]int, dataSize)

	for i := range data {
		data[i] = rand.Int()
	}

	slices.Sort(data)
}

func BenchmarkSearch(b *testing.B) {
	type Case struct {
		Name string
		Do   func([]int, int)
	}

	cases := []Case{
		{"LinearSearch", LinearSearch},
		{"BinarySearch", BinarySearch},
		{"JumpSearch", JumpSearch},
	}

	for _, c := range cases {
		c := c

		b.Run(c.Name, func(b *testing.B) {
			b.ReportMetric(float64(len(data)), "items/count")
			b.ReportMetric(float64(runtime.NumCPU()), "NumCPU")
			b.ReportAllocs()

			for i := 0; i < b.N; i++ {
				target := data[rand.Intn(len(data))]
				c.Do(data, target)
			}
		})
	}
}

func LinearSearch(xs []int, x int) {
	for _, y := range xs {
		if x == y {
			break
		}
	}
}

func BinarySearch(xs []int, x int) {
	_, _ = slices.BinarySearch(xs, x)
}

func JumpSearch(xs []int, x int) {
	n := len(xs)
	if n == 0 {
		return
	}

	step := int(math.Sqrt(float64(n)))
	prev := 0

	for xs[min(step, n)-1] < x {
		prev = step
		step += int(math.Sqrt(float64(n)))
		if prev >= n {
			return
		}
	}

	for i := prev; i < min(step, n); i++ {
		if xs[i] == x {
			return
		}
	}
}
