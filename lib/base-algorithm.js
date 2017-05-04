const randomItem = require('random-item')
const request = require('request-promise')

module.exports = class BaseAlgorithm {
    static get apiBaseUri() {
        return 'https://wordsapiv1.p.mashape.com/words'
    }

    constructor(apiKey) {
        if (typeof apiKey !== 'string') throw new TypeError('apiKey')

        this._apiKey = apiKey
        this._nextWordCount = 0
    }

    getBaseWord() {
        this._nextWordCount = 0

        const partOfSpeech = ['noun', 'pronoun', 'adjective'][Math.floor(Math.random() * 3)]

        return request(`${BaseAlgorithm.apiBaseUri}?random=true&partOfSpeech=${partOfSpeech}`, {
            json: true,
            headers: {
                'X-Mashape-Key': this._apiKey
            },
            transform: (data) => {
                return data.word
            }
        })
    }

    get hasNextWord() {
        return this._nextWordCount < 1
    }

    getNextWord(baseWord) {
        return request(`${BaseAlgorithm.apiBaseUri}/${baseWord}/rhymes`, {
            json: true,
            headers: {
                'X-Mashape-Key': this._apiKey
            },
            transform: (data) => {
                return randomItem(data.rhymes.all)
            }
        }).then((data) => {
            this._nextWordCount++

            return data
        }, (err) => {
            // this is a fallback implementation for when the base word has no rhymes
            // rather than starting over, we just provide another base word as the next
            // this could be done better to get better usernames.
            return this.getBaseWord().then((data) => {
                this._nextWordCount++

                return data
            })
        })
    }
}