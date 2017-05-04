const randomItem = require('random-item')
const isArrayish = require('is-arrayish')
const BaseAlgorithm = require('./base-algorithm')

module.exports = class Generator {
    constructor(algos) {
        // should be a string (apiKey) or array of BaseAlgorithm derivations
        if (typeof algos === 'string') algos = [new BaseAlgorithm(algos)]
        else if (algos instanceof BaseAlgorithm) algos = [algos]

        if (!isArrayish(algos)) throw new TypeError('algos')

        this._algos = algos
    }

    generate() {
        const algo = randomItem(this._algos)

        return algo.getBaseWord()
            .then((word) => {
                let mutableResult = word

                const nextWordGen = () => {
                    return algo.getNextWord(mutableResult)
                        .then((nextWord) => {
                            mutableResult += nextWord

                            return mutableResult
                        })
                }

                return nextWordGen().then((res) => {
                    if (algo.hasNextWord) {
                        return nextWordGen()
                    } else {
                        return res
                    }
                })
            })
    }
}