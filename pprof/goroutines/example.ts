export const example = `
goroutine 8 [running]:
runtime/pprof.writeGoroutineStacks({0x10253fec8, 0x140001e68c0})
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/pprof/pprof.go:703 +0x6c
runtime/pprof.writeGoroutine({0x10253fec8?, 0x140001e68c0?}, 0x14000182600?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/pprof/pprof.go:692 +0x2c
runtime/pprof.(*Profile).WriteTo(0x10251a220?, {0x10253fec8?, 0x140001e68c0?}, 0xc?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/pprof/pprof.go:329 +0x148
net/http/pprof.handler.ServeHTTP({0x140001981c1, 0x9}, {0x102541a08, 0x140001e68c0}, 0x14000157988?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/pprof/pprof.go:267 +0x3d8
net/http/pprof.Index({0x102541a08?, 0x140001e68c0}, 0x14000182600?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/pprof/pprof.go:384 +0xc8
net/http.HandlerFunc.ServeHTTP(0x14000157b08?, {0x102541a08?, 0x140001e68c0?}, 0x1023f1188?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2136 +0x38
net/http.(*ServeMux).ServeHTTP(0x102727ec0?, {0x102541a08, 0x140001e68c0}, 0x14000182600)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2514 +0x144
net/http.serverHandler.ServeHTTP({0x1400010af30?}, {0x102541a08?, 0x140001e68c0?}, 0x6?)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2938 +0xbc
net/http.(*conn).serve(0x14000146000, {0x102541fd8, 0x1400010ae40})
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2009 +0x518
created by net/http.(*Server).Serve in goroutine 1
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:3086 +0x4cc

goroutine 1 [IO wait]:
internal/poll.runtime_pollWait(0x129446720, 0x72)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/netpoll.go:343 +0xa0
internal/poll.(*pollDesc).wait(0x14000144000?, 0x102229fe8?, 0x0)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/internal/poll/fd_poll_runtime.go:84 +0x28
internal/poll.(*pollDesc).waitRead(...)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/internal/poll/fd_poll_runtime.go:89
internal/poll.(*FD).Accept(0x14000144000)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/internal/poll/fd_unix.go:611 +0x250
net.(*netFD).accept(0x14000144000)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/fd_unix.go:172 +0x28
net.(*TCPListener).accept(0x14000072100)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/tcpsock_posix.go:152 +0x28
net.(*TCPListener).Accept(0x14000072100)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/tcpsock.go:315 +0x2c
net/http.(*Server).Serve(0x14000142000, {0x102541b28, 0x14000072100})
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:3056 +0x2b8
net/http.(*Server).ListenAndServe(0x14000142000)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:2985 +0x84
net/http.ListenAndServe(...)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:3239
main.main()
	/Users/username/projects/example/main.go:20 +0xe8

goroutine 6 [chan send]:
main.main.func1()
	/Users/username/projects/example/main.go:12 +0x28
created by main.main in goroutine 1
	/Users/username/projects/example/main.go:11 +0x6c

goroutine 7 [chan receive]:
main.main.func2()
	/Users/username/projects/example/main.go:17 +0x24
created by main.main in goroutine 1
	/Users/username/projects/example/main.go:16 +0xc0

goroutine 23 [IO wait]:
internal/poll.runtime_pollWait(0x129446628, 0x72)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/runtime/netpoll.go:343 +0xa0
internal/poll.(*pollDesc).wait(0x14000144080?, 0x1400010af41?, 0x0)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/internal/poll/fd_poll_runtime.go:84 +0x28
internal/poll.(*pollDesc).waitRead(...)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/internal/poll/fd_poll_runtime.go:89
internal/poll.(*FD).Read(0x14000144080, {0x1400010af41, 0x1, 0x1})
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/internal/poll/fd_unix.go:164 +0x200
net.(*netFD).Read(0x14000144080, {0x1400010af41?, 0x1024faa20?, 0x102501080?})
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/fd_posix.go:55 +0x28
net.(*conn).Read(0x1400004e058, {0x1400010af41?, 0x1?, 0x1400019a410?})
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/net.go:179 +0x34
net/http.(*connReader).backgroundRead(0x1400010af30)
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:683 +0x40
created by net/http.(*connReader).startBackgroundRead in goroutine 8
	/opt/homebrew/Cellar/go/1.21.5/libexec/src/net/http/server.go:679 +0xc8
`.trim();
