class Matchdoc {
    constructor(md) {

        this.doc = md
        // this.cardid = 0

        this.start()

    }


    startofturneffects = {
        damage: (amount, target) => {

            if (target == "op") {

                this.doc[`player${this.doc.notatturn}`].stats.health -= amount

                let greenred = {
                    green: (this.doc[`player${this.doc.notatturn}`].stats.health / 50) * 100,
                    red: ((this.doc[`player${this.doc.notatturn}`].stats.health / 50) * 100) + 10
                }

                this.doc[`player${this.doc.atturn}`].connection.emit('healthchange', { elem: "otherplayer", green: greenred.green, red: greenred.red })
                this.doc[`player${this.doc.notatturn}`].connection.emit('healthchange', { elem: "player", green: greenred.green, red: greenred.red })

            } else if (target == "self") {

                this.doc[`player${this.doc.atturn}`].stats.health -= amount

                let greenred = {
                    green: (this.doc[`player${this.doc.atturn}`].stats.health / 50) * 100,
                    red: ((this.doc[`player${this.doc.atturn}`].stats.health / 50) * 100) + 10
                }

                this.doc[`player${this.doc.notatturn}`].connection.emit('healthchange', { elem: "otherplayer", green: greenred.green, red: greenred.red })
                this.doc[`player${this.doc.atturn}`].connection.emit('healthchange', { elem: "player", green: greenred.green, red: greenred.red })

            }

        }
    }


    otherPlrNum = (curplrnum) => {

        if (curplrnum == 1) return 2
        else return 1

    }

    timer = async () => {
        console.log(`timer: ${this.doc.timer}`)
        if (this.doc.timer > 0) {

            let targetupdate = {
                player1: undefined,
                player2: undefined
            }

            if (this.doc.atturn == 1) {

                targetupdate.player1 = "owntimer"
                targetupdate.player2 = "optimer"

            } else {

                targetupdate.player1 = "optimer",
                    targetupdate.player2 = "owntimer"

            }

            this.doc.timer--
            this.doc.player1.connection.emit(`timerupdate`, { elem: targetupdate.player1, value: this.doc.timer })
            this.doc.player2.connection.emit(`timerupdate`, { elem: targetupdate.player2, value: this.doc.timer })

        } else {

            clearInterval(this.interval)

            this.endofturn()

            // if (this.doc.atturn == 1) this.doc.atturn = 2
            // else this.doc.atturn = 1

            // this.doc.timer = 60

        }

    }

    start = () => {

        // this.interval = setInterval(this.timer, 1000)

        this.startofturn()

        this.listeners()

    }

    listeners = () => {

        let sockets = {
            1: this.doc.player1.connection,
            2: this.doc.player2.connection
        }

        for (let [i, v] of Object.entries(sockets)) {

            // console.log(`this.atturn=${this.atturn}, i=${i}`)
            // all listeners that only work during own turn
            if (this.doc.atturn == i) {

                // endturn
                v.on('endturn', () => {

                    this.endofturn()

                })

                // cardplayed
                // console.log(`cardplayed?`)
                v.on('cardplayed', (data) => {
                    console.log(data)
                    let contains = [false, undefined] // yes/no, atindex

                    for (let i = 0; i < this.doc[`player${this.doc.atturn}`].hand.length; i++) {
                        // console.log(this.doc[`player${this.doc.atturn}`].hand[i], data.cardid)
                        // console.log(this.doc[`player${this.doc.atturn}`].hand)
                        if (this.doc[`player${this.doc.atturn}`].hand[i][0][1] == data.cardid) {

                            contains = [true, i]
                            // console.log(`the card is in the hand`)

                        }

                    }

                    if (contains[0] && !this.doc[`player${this.doc.atturn}`].board[`pos${data.position}`]) {

                        let picked = this.doc[`player${this.doc.atturn}`].hand.splice(contains[1], 1)

                        // console.log(picked)

                        this.doc[`player${this.doc.atturn}`].board[`pos${data.position}`] = picked
                        console.log(this.doc[`player${this.doc.atturn}`].board[`pos${data.position}`])

                        this.doc[`player${this.doc.atturn}`].connection.emit(`cardplaced`, { picked: data.cardid, position: data.position, player: `own` })
                        this.doc[`player${this.otherPlrNum(this.doc.atturn)}`].connection.emit(`cardplaced`, { picked: data.cardid, position: data.position, player: `op`, cardinfo: picked })

                    }

                })

            }

            // other listeners

        }

    }

    endofturn = () => {

        clearInterval(this.interval)

        if (this.doc.atturn == 1) {


            this.doc.atturn = 2
            this.doc.timer = 60

        } else {

            this.doc.atturn = 1
            this.doc.gameturn++
            this.doc.timer = 60

        }

        this.startofturn()

    }

    startofturn = () => {

        if (this.doc.gameturn == 1) { // turn 1

            let amount = 4
            let drawn = []

            for (let i = 0; i < amount; i++) {

                let randompick = Math.max(Math.round((Math.random() * this.doc[`player${this.doc.atturn}`].stack.length) - 1), 0)
                let picked = this.doc[`player${this.doc.atturn}`].stack.splice(randompick, 1)

                drawn.push(picked)
                this.doc[`player${this.doc.atturn}`].hand.push(picked)

            }

            this.doc[`player${this.doc.atturn}`].connection.emit('draw', drawn)

        } else { // not turn 1

            if (this.doc[`player${this.doc.atturn}`].hand.length < 6) { // not full hand

                let amount = 1
                let drawn = []

                for (let i = 0; i < amount; i++) {

                    let randompick = Math.max(Math.round((Math.random() * this.doc[`player${this.doc.atturn}`].stack.length) - 1), 0)
                    let picked = this.doc[`player${this.doc.atturn}`].stack.splice(randompick, 1)

                    drawn.push(picked)
                    this.doc[`player${this.doc.atturn}`].hand.push(picked)

                }

                this.doc[`player${this.doc.atturn}`].connection.emit('draw', drawn)

            } else { // full hand

                let drawn = []

                this.doc[`player${this.doc.atturn}`].connection.emit('draw', drawn)

            }

        }


        if (this.doc.atturn == 1) this.doc.notatturn = 2
        else this.doc.notatturn = 1

        this.startofturneffects.damage(10, "op")

        for (let [i, v] of Object.entries(this.doc[`player${this.doc.atturn}`].board)) {

            if (v) {

                if (v.pow) {

                    for (let i of v.pow) {

                        if (Object.keys(i) != 0) {



                        }

                    }

                }

            }

        }

        this.interval = setInterval(this.timer, 1000)

    }


}

module.exports = {
    match: {
        start: (matchdoc) => {

            console.log(`starting match between ${matchdoc.player1.cookie} and ${matchdoc.player2.cookie}`)
            new Matchdoc(matchdoc)

        }
    }
}