// libraries
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const cookieParser = require("cookie-parser")


// modules
const cards = require('./modules/cards')
const spells = require('./modules/spells')
const effects = require('./modules/effects')

const utils = require('./ext/utils')
const { match } = require('./ext/matchprogress')


// cores
const app = express()
const server = http.createServer(app)
const { Server } = socket
const io = new Server(server)

const { Matches } = utils


let matches = {
    /*
    matchid: {
        atturn: 1,
        timer: 60,
        player1: <same as player2>,
        player2: {
            cookie: <>,
            stats: {
                balance: <>,
                health: <>
            }
            hand: {
                creature: {
                    name: <>,
                    atk: <>,
                    def: <>,
                    cost: <>,
                    pow: [<>]
                },
                spell: {
                    name: <>,
                    cost: <>,
                    pow: [<>]
                }
            },
            deathpit: {
                creature: {
                    name: <>,
                    atk: <>,
                    def: <>,
                    cost: <>,
                    pow: [<>]
                },
                spell: {
                    name: <>,
                    cost: <>,
                    pow: [<>]
                }
            },
            stack: {
                creature: {
                    name: <>,
                    atk: <>,
                    def: <>,
                    cost: <>,
                    pow: [<>]
                },
                spell: {
                    name: <>,
                    cost: <>,
                    pow: [<>]
                }
            },
            board: {
                pos1: {
                    name: <>,
                    atk: <>,
                    def: <>,
                    cost: <>,
                    pow: [<>]
                },
                pos2: undefined,
                pos3: undefined,
                pos4: undefined
            }
        }
    }
     */
}




app.set('views engine', 'ejs')
app.set('views', 'frontend')
app.use(express.static('frontend'))
app.use(cookieParser('testing'))



app.get(`/*`, (req, res, next) => {

    let { plrid } = req.signedCookies

    // console.log(`playerid is ${plrid}`)

    if (!plrid) {

        let playerid = `playerid${Matches.makePlrId()}`

        res.cookie(`plrid`, playerid, { signed: true })
        res.cookie(`plridunsigned`, playerid)

    }

    next()

})



app.get(`/makematch`, (req, res) => {

    let { plrid } = req.signedCookies

    if (!plrid) return res.redirect(`back`)

    let id = `id${Matches.makeMatchId()}`

    matches[id] = {
        inprogress: false,
        atturn: 1,
        gameturn: 1,
        timer: 60,
        player1: Matches.makePlayer(),
        player2: Matches.makePlayer()
    }

    matches[id].player1.stack = Matches.randomiseStack(),
    matches[id].player2.stack = Matches.randomiseStack(),

    // console.log(matches[id].player1.stack, matches[id].player2.stack)

    matches[id].player1.cookie = plrid

    res.redirect(`/matches/id/${id}`)

})

app.get(`/`, (req, res) => {

    // res.send(`works`)
    res.render(`play.ejs`, {you: "nobody", opponent: "nobody"})
    // res.sendFile()

})

app.get(`/matches/id/:id`, (req, res) => {

    let { id } = req.params
    let { plrid } = req.signedCookies

    if (!matches[id]) return res.send(`This match does not exist!`)
    if (!matches[id].player2.cookie && matches[id].player1.cookie != plrid) matches[id].player2.cookie = plrid

    console.log(matches[id].player1.cookie, matches[id].player2.cookie)

    if (plrid == matches[id].player1.cookie || plrid == matches[id].player2.cookie) {

        let opponent = undefined

        if (plrid == matches[id].player1.cookie) {

            if (matches[id].player2.cookie) opponent = matches[id].player2.cookie
            else opponent = `Nobody yet!`

        }
        else opponent = matches[id].player1.cookie

        res.render(
            `play.ejs`, 
            {
                you: plrid,
                opponent: opponent // matches[id][`player${other}`].cookie
            }
        )

    } else return res.send(`This match is full!`)

})

app.get(`thismatchdoesnotexist`, (req, res) => res.send(`This match either does not exist or you are not one of the players.`))






io.on('connection', (socket) => {

    console.log(`a user connected`)

    socket.on('disconnect', () => {

        console.log(`a user disconnected`)

    })

    socket.on('identification', (data) => {
        console.log(`..identification`)
        console.log(data)
        if (!matches[data.matchid]) return socket.emit(`redirect`, `/thismatchdoesnotexist`)
        else if (matches[data.matchid].player1.cookie == data.id || matches[data.matchid].player2.cookie == data.id) {

            console.log(`emitting idresponse`)
            socket.emit(`idresponse`, true)

            if (matches[data.matchid].player1.cookie == data.id) {

                matches[data.matchid].player1.connected = true
                matches[data.matchid].player1.connection = socket

                if (matches[data.matchid].player2.connected) {

                    if (!matches[data.matchid].inprogress) {

                        matches[data.matchid].inprogress = true
                        match.start(matches[data.matchid])

                    }

                }

            } else {

                matches[data.matchid].player2.connected = true
                matches[data.matchid].player2.connection = socket

                if (matches[data.matchid].player1.connected) {

                    if (!matches[data.matchid].inprogress) {

                        matches[data.matchid].inprogress = true
                        match.start(matches[data.matchid])

                    }

                }

            }
            

        } else return socket.emit(`redirect`, `/thismatchdoesnotexist`)

    })

    // socket.on('endturn', (data) => {
    //     console.log(socket)
    //     console.log(`endturn from index`)
        
    // })

})


const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`listening on port ${PORT}`))

