let lastmatchid = 1
let lastplrid = 1


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
                    balance: undefined,
                    health: undefined
                },
                hand: {
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
                },
                deathpit: {
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
                },
                stack: {
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
                },
                board: {
                    pos1: {
                        name: undefined,
                        atk: undefined,
                        def: undefined,
                        cost: undefined,
                        pow: [undefined]
                    },
                    pos2: undefined,
                    pos3: undefined,
                    pos4: undefined
                }
            }

        }
    }
}