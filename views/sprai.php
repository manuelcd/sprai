html
  head
    title= title
    script(src='app.js')
    link(rel='stylesheet', href='app.css')
  body
    style
        |  #outgoing {
        |    width: 600px;
        |    word-wrap: break-word;
        |  }
    form
        textarea(id="incoming") dsdsd
        button(type="submit") submit
    pre(id="outgoing")
    h1=message

    script(text='text/javascript').

        var getUserMedia = require('getusermedia')

        getUserMedia({ video: true, audio: false }, function (err, stream) {
            if (err) return console.error(err)

            var peer = new Peer({
                initiator: location.hash === '#init',
                trickle: false,
                stream: stream
            })

            peer.on('signal', function (data) {
                document.getElementById('yourId').value = JSON.stringify(data)
            })

            document.getElementById('connect').addEventListener('click', function () {
                var otherId = JSON.parse(document.getElementById('otherId').value)
                peer.signal(otherId)
            })

            document.getElementById('send').addEventListener('click', function () {
                var yourMessage = document.getElementById('yourMessage').value
                peer.send(yourMessage)
            })

            peer.on('data', function (data) {
                document.getElementById('messages').textContent += data + '\n'
            })

            peer.on('stream', function (stream) {
                var video = document.createElement('video')
                document.body.appendChild(video)

                video.src = window.URL.createObjectURL(stream)
                video.play()
            })
        })
