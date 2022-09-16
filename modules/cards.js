class Card {
    constructor(name, atk, def, cost, pow) {

        // this.Values = {}
        this.Values = { name, atk, def, cost, pow }

    }
}


module.exports = {
    Rat: new Card(
        "Rat",
        1,
        1,
        1,
        [
            {
                "desc": "Give <amount> poison to any enemy this attacks. (Triggers 3 times MAX)",
                "iter": 3,
                "efct": "diseased:1"
            }
        ]
    ),
    Mouse: new Card(
        "Mouse",
        1,
        1,
        0,
        []
    ),
    "": new Card()
}