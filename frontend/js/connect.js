function getcookie(n) {

    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${n}=`))
        ?.split('=')[1]

    return cookieValue

}


document.addEventListener('DOMContentLoaded', () => {

    let socket = io()
    let handamount = 0

    let ownhealth = document.getElementById('player')
    let ophealth = document.getElementById('otherplayer')
    let selectedcard = undefined
    let ownboard = {
        1: {
            el: document.getElementById(`ownSLOT1`),
            taken: false
        },
        2: {
            el: document.getElementById(`ownSLOT2`),
            taken: false
        },
        3: {
            el: document.getElementById(`ownSLOT3`),
            taken: false
        },
        4: {
            el: document.getElementById(`ownSLOT4`),
            taken: false
        }
    }
    let ownhand = []

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

    socket.on('draw', (drawn) => {

        console.log(drawn)

        let handcards = []

        for (let i of drawn) {
            console.log(`in drawn`)
            let cardid = i[0][1]
            i = i[0][0]
            handamount++

            let card = newCardClass(i.Values)
            let handcard = card.makeCard(false, handamount)

            handcard.setAttribute('cardid', cardid)

            let handdiv = document.getElementById('handdiv')
            handdiv.appendChild(handcard)

            handcards.push(handcard)

        }

        listenToCards(handcards)

    })

    socket.on('cardplaced', (data) => {
        console.log(`cardplaced`)
        console.log(data)
        let { picked, position, player, cardinfo } = data

        let slot = document.getElementById(`${player}SLOT${position}`)
        
        let card

        if (cardinfo) {

            let c = newCardClass(cardinfo[0][0][0].Values)
            card = c.makeCard(false, handamount)

            card.setAttribute('cardid', picked)

        } else {

            card = document.querySelector(`[cardid="${picked}"]`)

        }

        console.log(`querySelector(\`[cardid="${picked}"]\`)`)
        console.log(slot, card)
        card.classList = `card active`

        slot.appendChild(card)

    })



    // local listeners
    let endturn = document.getElementById('endturn')
    endturn.addEventListener('click', () => {
        console.log(`clicked`)
        socket.emit('endturn', true)

    })

    function listenToCards(cards) {

        for (let icard of cards) {

            iclick = () => {

                for (let j of cards) {

                    j.style = ``

                }

                icard.style = `outline-color: blue;`
                selectedcard = icard

                let slotstoend = []

                for (let [id, slot] of Object.entries(ownboard)) {

                    if (slot.taken == false) {

                        slotclick = () => {

                            console.log(`slotid=${id}`)

                            for (let i of slotstoend) {

                                console.log(`removed from slot ${i.slot}`)
                                console.log(i.slot)
                                i.slot.el.removeEventListener('click', i.f)

                            }

                            // i.classList = `card active`
                            // slot.el.appendChild(i)
                            // slot.taken = true
                            console.log(`emitting cardplayed`)
                            console.log({cardid: icard.getAttribute('cardid'), position: id})
                            socket.emit('cardplayed', { cardid: icard.getAttribute('cardid'), position: id })

                        }

                        slot.el.addEventListener('click', slotclick)
                        slotstoend.push({ slot: slot, f: slotclick })

                    }

                }

            }

            icard.addEventListener('click', iclick)

        }

    }







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