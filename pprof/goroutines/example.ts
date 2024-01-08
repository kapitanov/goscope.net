export const example = `
goroutine 26 [running]:
runtime/pprof.writeGoroutineStacks({0x104983e78, 0x14000282000})
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/pprof/pprof.go:703 +0x6c
runtime/pprof.writeGoroutine({0x104983e78?, 0x14000282000?}, 0x140001f4000?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/pprof/pprof.go:692 +0x2c
runtime/pprof.(*Profile).WriteTo(0x10495e180?, {0x104983e78?, 0x14000282000?}, 0xc?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/pprof/pprof.go:329 +0x148
net/http/pprof.handler.ServeHTTP({0x140001a40d1, 0x9}, {0x1049859a8, 0x14000282000}, 0x140001e5988?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/pprof/pprof.go:267 +0x3d8
net/http/pprof.Index({0x1049859a8?, 0x14000282000}, 0x140001f4000?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/pprof/pprof.go:384 +0xc8
net/http.HandlerFunc.ServeHTTP(0x140001e5b08?, {0x1049859a8?, 0x14000282000?}, 0x104835188?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2136 +0x38
net/http.(*ServeMux).ServeHTTP(0x104b6bf60?, {0x1049859a8, 0x14000282000}, 0x140001f4000)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2514 +0x144
net/http.serverHandler.ServeHTTP({0x14000184f30?}, {0x1049859a8?, 0x14000282000?}, 0x6?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2938 +0xbc
net/http.(*conn).serve(0x140001f0000, {0x104985f78, 0x14000184e40})
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2009 +0x518
created by net/http.(*Server).Serve in goroutine 1
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:3086 +0x4cc

goroutine 1 [IO wait]:
internal/poll.runtime_pollWait(0x12b88ce48, 0x72)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/netpoll.go:343 +0xa0
internal/poll.(*pollDesc).wait(0x140001dc080?, 0x10466dfe8?, 0x0)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/internal/poll/fd_poll_runtime.go:84 +0x28
internal/poll.(*pollDesc).waitRead(...)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/internal/poll/fd_poll_runtime.go:89
internal/poll.(*FD).Accept(0x140001dc080)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/internal/poll/fd_unix.go:611 +0x250
net.(*netFD).accept(0x140001dc080)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/fd_unix.go:172 +0x28
net.(*TCPListener).accept(0x140001b60e0)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/tcpsock_posix.go:152 +0x28
net.(*TCPListener).Accept(0x140001b60e0)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/tcpsock.go:315 +0x2c
net/http.(*Server).Serve(0x140001ec000, {0x104985ac8, 0x140001b60e0})
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:3056 +0x2b8
net/http.(*Server).ListenAndServe(0x140001ec000)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2985 +0x84
net/http.ListenAndServe(...)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:3239
main.main()
	/Users/username/projects/projectname/main.go:56 +0x178

goroutine 19 [chan send]:
main.main.func1()
	/Users/username/projects/projectname/main.go:24 +0x2c
created by main.main in goroutine 1
	/Users/username/projects/projectname/main.go:23 +0x24

goroutine 20 [chan receive]:
main.main.func2()
	/Users/username/projects/projectname/main.go:28 +0x28
created by main.main in goroutine 1
	/Users/username/projects/projectname/main.go:27 +0x30

goroutine 21 [sync.Mutex.Lock]:
sync.runtime_SemacquireMutex(0x0?, 0x0?, 0x0?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/sema.go:77 +0x28
sync.(*Mutex).lockSlow(0x104b6bff8)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/sync/mutex.go:171 +0x174
sync.(*Mutex).Lock(...)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/sync/mutex.go:90
main.main.func3()
	/Users/username/projects/projectname/main.go:33 +0x84
created by main.main in goroutine 1
	/Users/username/projects/projectname/main.go:32 +0xa8

goroutine 22 [sync.Cond.Wait]:
sync.runtime_notifyListWait(0x104b2ccb0, 0x0)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/sema.go:527 +0x154
sync.(*Cond).Wait(0x104b2cca0)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/sync/cond.go:70 +0xcc
main.main.func4()
	/Users/username/projects/projectname/main.go:38 +0x3c
created by main.main in goroutine 1
	/Users/username/projects/projectname/main.go:36 +0xb4

goroutine 23 [semacquire]:
sync.runtime_Semacquire(0x0?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/sema.go:62 +0x2c
sync.(*WaitGroup).Wait(0x104b6c430)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/sync/waitgroup.go:116 +0x74
main.main.func5()
	/Users/username/projects/projectname/main.go:44 +0x24
created by main.main in goroutine 1
	/Users/username/projects/projectname/main.go:43 +0xd0

goroutine 24 [sync.RWMutex.RLock]:
sync.runtime_SemacquireRWMutexR(0x0?, 0x0?, 0x0?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/sema.go:82 +0x28
sync.(*RWMutex).RLock(...)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/sync/rwmutex.go:71
main.main.func6()
	/Users/username/projects/projectname/main.go:49 +0x74
created by main.main in goroutine 1
	/Users/username/projects/projectname/main.go:48 +0xe8

goroutine 25 [sync.Mutex.Lock]:
sync.runtime_SemacquireMutex(0x0?, 0x0?, 0x0?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/sema.go:77 +0x28
sync.(*Mutex).lockSlow(0x104b6c4d0)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/sync/mutex.go:171 +0x174
sync.(*Mutex).Lock(...)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/sync/mutex.go:90
sync.(*RWMutex).Lock(0x104b6c4d0)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/sync/rwmutex.go:147 +0x70
main.main.func7()
	/Users/username/projects/projectname/main.go:52 +0x24
created by main.main in goroutine 1
	/Users/username/projects/projectname/main.go:51 +0xf4

goroutine 27 [runnable]:
net/http.(*connReader).startBackgroundRead.func2()
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:679
runtime.goexit()
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/asm_arm64.s:1197 +0x4
created by net/http.(*connReader).startBackgroundRead in goroutine 26
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:679 +0xc8
`.trim();
