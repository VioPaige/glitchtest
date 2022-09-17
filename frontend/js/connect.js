function getcookie(n) {

    const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${n}=`))
    ?.split('=')[1]

    return cookieValue

}


document.addEventListener('DOMContentLoaded', () => {

    let socket = io()





    // listeners
    socket.on('idresponse', (r) => {

        console.log(`idresponse ${r}`)

    })

    socket.on('timerupdate', (t) => {

        console.log(t)

        let timer = document.getElementById(t.elem)
        timer.innerText = t.value

    })


    // local listeners
    let endturn = document.getElementById('endturn')
    endturn.addEventListener('click', () => {
        console.log(`clicked`)
        socket.emit('endturn', true)

    })







    // cores
    let gameid = window.location.href
    gameid = gameid.split(`/`)

    let message = {
        id: getcookie("plridunsigned"),
        matchid: gameid[gameid.length - 1]
    }

    console.log(message)

    socket.emit('identification', message)

})