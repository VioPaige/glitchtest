function getcookie(n) {

    const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${n}=`))
    ?.split('=')[1]

    return cookieValue

}


document.addEventListener('DOMContentLoaded', () => {

    let socket = io()

    let ownhealth = document.getElementById('player')
    let ophealth = document.getElementById('otherplayer')

    ownhealth.style.backgroundImage = `linear-gradient(90deg, rgb(0, 255, 0) ${100}%, rgb(255, 0, 0) ${110}%)`
    ophealth.style.backgroundImage = `linear-gradient(90deg, rgb(0, 255, 0) ${100}%, rgb(255, 0, 0) ${110}%)`

    console.log(ownhealth)
    console.log(ophealth)


    // listeners
    socket.on('idresponse', (r) => {

        console.log(`idresponse ${r}`)

    })

    socket.on('timerupdate', (t) => {

        console.log(t)

        let timer = document.getElementById(t.elem)
        timer.innerText = t.value

    })

    socket.on('healthchange', (t) => { // max 50hp?

        let bar = document.getElementById(t.elem)
        bar.style.backgroundImage = `linear-gradient(90deg, rgb(0, 255, 0) ${t.green}%, rgb(255, 0, 0) ${t.red}%)`

    })


    // local listeners
    let endturn = document.getElementById('endturn')
    endturn.addEventListener('click', () => {
        console.log(`clicked`)
        socket.emit('endturn', true)

    })

    function listenToCard(card) {


        
    }

    function callback(mutList, observer) {

        for (let i of mutList) {

            console.log(i)

        }

    }

    let hand = document.getElementById('handdiv')
    let mut = new MutationObserver(callback)
    let config = { childList: true }
    mut.observe(hand, config)





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