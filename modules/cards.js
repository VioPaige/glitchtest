class Card {
    constructor(name, atk, def, cost, pow) {

        // this.Values = {}
        this.Values = { name, atk, def, cost, pow }

    }
}


module.exports = {
    Rat: () => {
        return new Card(
            "Rat",
            1, // attack
            1, // defense
            1, // cost
            [ // powers
                {
                    desc: "Give 1 poison to any enemy this attacks. (Triggers 3 times MAX)",
                    iter: 3,
                    efct: "diseased:1"
                }
            ]
        )
    },
    Mouse: () => {
        return new Card(
            "Mouse",
            1,
            1,
            0,
            []
        )
    },
    Bat: () => {
        return new Card(
            "Bat",
            2,
            3,
            5,
            [
                {
                    desc: "Flying",
                    iter: -1,
                    efct: "flying:-1"
                }
            ]
        )
    }
    ,
    Boar: () => {
        return new Card(
            "Boar",
            5,
            5,
            7,
            [
                {
                    desc: "Rage",
                    iter: -1,
                    efct: "rage:-1"
                }
            ]
        )
    }, 
}