const Generator = require('./lib/generator')
const BaseAlgorithm = require('./lib/base-algorithm')

let exportable = (apiKey) => {
    apiKey = apiKey || process.env.MKUSERNAME_API_KEY

    if (typeof apiKey !== 'string') throw new TypeError('apiKey')

    return new Generator(apiKey).generate()
}

exportable.Generator = Generator
exportable.BaseAlgorithm = BaseAlgorithm

module.exports = exportable