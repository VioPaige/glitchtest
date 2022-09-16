class Effect {
    constructor(name, shortcut, effect) {

        this = { name, shortcut, effect }

    }
}


module.exports = {
    "diseased": new Effect(
        "Disease",
        "dss",
        (owner) => {

            console.log(`owner has disease`) // starts at counter 1, start of turn: deal <counter> damage to self and increase counter by one

        }
    ),
    "drunk": new Effect(
        "Drunk",
        "drk",
        (owner) => {

            console.log(`owner is drunk`) // loses 1 HP at start of turn, then change into HUNGOVER effect

        }
    ),
    "courageous": new Effect(
        "Courageous",
        "crg",
        (owner) => {

            console.log(`owner is courageous`) // can attack twice per turn, end of turn counter down by 1

        }
    ),
    "hungover": new Effect(
        "Hungover",
        "hgv",
        (owner) => {

            console.log(`owner is hungover`) // disables attack, removes itself at end of turn

        }
    )
}