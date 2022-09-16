class Effect {
    constructor(name, shortcut, effect) {

        // this.Values = {}
        this.Values = { name, shortcut, effect }

    }
}


module.exports = {
    diseased: new Effect(
        "Disease",
        "dss",
        (owner) => {

            console.log(`owner has disease`) // starts at counter 1, start of turn: deal <counter> damage to self and increase counter by one

        }
    ),
    drunk: new Effect(
        "Drunk",
        "drk",
        (owner) => {

            console.log(`owner is drunk`) // loses 1 HP at start of turn, then change into HUNGOVER effect

        }
    ),
    courageous: new Effect(
        "Courageous",
        "crg",
        (owner) => {

            console.log(`owner is courageous`) // can attack twice per turn, end of turn counter down by 1

        }
    ),
    hungover: new Effect(
        "Hungover",
        "hgv",
        (owner) => {

            console.log(`owner is hungover`) // disables attack, removes itself at end of turn

        }
    ),
    flying: new Effect(
        "Flying",
        "fln",
        (owner) => {

            console.log(`owner is flying type`) // can only be hit during enemy turn

        }
    ),
    running: new Effect(
        "Running",
        "run",
        (owner) => {

            console.log(`owner is running`) // if owner attacks and the ATK is more than target DEF, the excess ATK is dealt to the next creature summoned in front of this (if this is still alive)

        }
    ),
    adrenalinerush: new Effect(
        "Adrenaline Rush",
        "adr",
        (owner) => {

            console.log(`owner has adrenaline rush`) // counter=3, at start of turn counter goes down by one, if counter is above 0 and owner is killed, owner stays on the board until next end of turn

        }
    )
}