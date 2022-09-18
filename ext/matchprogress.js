class Matchdoc {
    constructor(md) {

        this.doc = md

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




    timer = async () => { // clear by clearInterval(interval)

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

            v.on('endturn', () => {

                // console.log(`endturn`)
                // if (this.doc.atturn == i) {

                //     if (i == 1) {

                //         clearInterval(this.interval)

                //         this.doc.atturn = 2
                //         this.doc.timer = 60

                //     } else {

                //         this.doc.atturn = 1
                //         this.doc.timer = 60

                //     }

                // } else {

                //     return

                // }

            })

        }

    }

    endofturn = () => {

        clearInterval(this.interval)

        if (this.doc.atturn == 1) {


            this.doc.atturn = 2
            this.doc.timer = 60

        } else {

            this.doc.atturn = 1
            this.doc.timer = 60

        }

        this.startofturn()

    }

    startofturn = () => {

        if (this.doc.atturn == 1) this.doc.notatturn = 2
        else this.doc.notatturn = 1

        this.startofturneffects.damage(10, "op")

        for (let [i, v] of Object.entries(this.doc[`player${this.doc.atturn}`].board)) {

            if (v) {

                if (v.pow) {

                    for (let i of v.pow) {

                        if (Object.keys(i) != 0) {

                            // i.startofturn

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