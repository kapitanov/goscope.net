// This is an example source code for Goroutines Viewer.
// Save it as "goroutines.go" and run it with "go run goroutines.go".
package main

import (
	"log"
	"net/http"
	"sync"

	_ "net/http/pprof"
)

var (
	ch1     = make(chan string)
	ch2     = make(chan string)
	mutex   sync.Mutex
	cond    = sync.NewCond(&sync.Mutex{})
	wg      sync.WaitGroup
	rwMutex sync.RWMutex
)

func main() {
	go func() {
		ch1 <- "Hello World"
	}()

	go func() {
		<-ch2
	}()

	mutex.Lock()
	go func() {
		mutex.Lock()
	}()

	go func() {
		cond.L.Lock()
		cond.Wait()
		cond.L.Unlock()
	}()

	wg.Add(1)
	go func() {
		wg.Wait()
	}()

	rwMutex.Lock()
	go func() {
		rwMutex.RLock()
	}()
	go func() {
		rwMutex.Lock()
	}()

	log.Println(`Open "http://localhost:6060/debug/pprof/goroutine?debug=2" in your browser.`)
	log.Println(http.ListenAndServe(":6060", nil))
}
