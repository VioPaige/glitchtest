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
                    desc: "Give 1 <span style=\"color:grey;\">diseased:1</span> to any enemy this attacks. (Triggers 3 times MAX)",
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
                    desc: "<span style=\"text-decoration: underline;\">Flying</span>",
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
                    desc: "<span style=\"text-decoration: underline;\">Rage</span>",
                    iter: -1,
                    efct: "rage:-1"
                }
            ]
        )
    },
    Wheat: () => {
        return new Card(
            "Wheat",
            0,
            5,
            5,
            [
                {
                    desc: "Start of turn: Earn 2 <span style=\"color: gold;\">balance</span>."
                }
            ]
        )
    }
}