// This is an example source code for Gouroutines Viewer.
// Save it as "main.go" and run it with "go run main.go".
package main

import (
	"log"
	"net/http"
	_ "net/http/pprof"
)

func main() {
	ch1 := make(chan string)
	go func() {
		ch1 <- "Hello World"
	}()

	ch2 := make(chan string)
	go func() {
		<-ch2
	}()

	log.Println(`Open "http://localhost:6060/debug/pprof/goroutine?debug=2" in your browser.`)
	log.Println(http.ListenAndServe(":6060", nil))
}
