class Spell {
    constructor(name, description, effect) {

        // this.Values = {}
        this.Values = { name, description, effect }

    }
}


module.exports = {
    "Beer": new Spell(
        "Beer",
        "Gives <b>drunk</b> and <b>courage:2</b> to target.",
        (owner) => {

            console.log(`target becomes drunk and courageous`)

        }
    )
}