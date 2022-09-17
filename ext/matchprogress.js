class Matchdoc{
    constructor(md) {

        this.doc = md

        this.start()

    }

    start = () => {

        let interval = setInterval(() => { // clear by clearInterval(interval)

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
                this.doc.player1.connection.emit(`timerupdate`, {elem: targetupdate.player1, value: this.doc.timer})
                this.doc.player2.connection.emit(`timerupdate`, {elem: targetupdate.player2, value: this.doc.timer})

            } else {

                if (this.doc.atturn == 1) this.doc.atturn = 2
                else this.doc.atturn = 1

                this.doc.timer = 60

            }

        }, 1000);

        this.listeners()

    }

    listeners = () => {

        let sockets = {
            1: this.doc.player1.connection,
            2: this.doc.player2.connection
        }

        for (let [i, v] of Object.entries(sockets)) {

            v.on('endturn', () => {
                console.log(`endturn`)
                if (this.doc.atturn == i) {

                    if (i == 1) {

                        this.doc.atturn = 2
                        this.doc.timer = 60

                    } else {

                        this.doc.atturn = 1
                        this.doc.timer = 60

                    }

                } else {

                    return

                }

            })

        }

    }


}

module.exports = {
    match: {
        start: (matchdoc) => {

            console.log(`starting match between ${matchdoc.player1.cookie} and ${matchdoc.player2.cookie}`)
            new Matchdoc(matchdoc)

        },
        reducetimer: () => {

            setInterval(() => {
                
            }, 1000);

        }
    }
}