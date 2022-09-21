let lastmatchid = 1
let lastplrid = 1

const cmod = {
    cards: require('../modules/cards'),
    spells: require('../modules/spells'),
    effects: require('../modules/effects')
}

module.exports = {
    Matches: {
        makeMatchId: () => {

            lastmatchid++
            return lastmatchid - 1

        },
        makePlrId: () => {

            lastplrid++
            return lastplrid - 1

        },
        makePlayer: () => {

            return {
                connected: undefined,
                connection: undefined,
                cookie: undefined,
                stats: {
                    balance: 0,
                    health: 50
                },
                hand: [],
                deathpit: [],
                stack: [],
                /*{
                    creature: {
                        name: undefined,
                        atk: undefined,
                        def: undefined,
                        cost: undefined,
                        pow: [undefined]
                    },
                    spell: {
                        name: undefined,
                        cost: undefined,
                        pow: [undefined]
                    }
                }*/
                board: {
                    pos1: undefined/*{
                        name: undefined,
                        atk: undefined,
                        def: undefined,
                        cost: undefined,
                        pow: [undefined]
                    }*/,
                    pos2: undefined,
                    pos3: undefined,
                    pos4: undefined
                }
            }

        },
        randomiseStack: () => {

            let amounts = {
                cards: 16,
                spells: 9
            }

            let id = 0

            let stack = []

            for (let [i, v] of Object.entries(amounts)) {

                for (let j = 0; j < v; j++) {

                    id++

                    let randompick = Math.max(Math.round(Math.random() * Object.keys(cmod[i]).length) - 1, 0)
                    let picked = cmod[i][Object.keys(cmod[i])[randompick]]

                    stack[stack.length] = [picked(), id]

                }

            }

            console.log(stack)

            return stack

        }
    }
}