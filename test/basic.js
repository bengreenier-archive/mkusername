const assert = require('assert')
const spawn = require('child_process').spawnSync
const mkusernameLibrary = require('../')
const Generator = require('../lib/generator')
const BaseAlgorithm = require('../lib/base-algorithm')

describe('mkusername.BaseAlgorithm', () => {
    it('ctor should take apiKey', () => {
        assert.doesNotThrow(() => {
            const i = new BaseAlgorithm('123')
        })
    })

    it('should have good default state', () => {
        const i = new BaseAlgorithm('123')
        
        assert.ok(i.hasNextWord === true)
    })

    it('should produce a baseWord', function (done) {
        this.timeout(5000)

        // note: this requires TEST_API_KEY to be set to succeed...
        const i = new BaseAlgorithm(process.env.TEST_API_KEY)

        i.getBaseWord().then((word) => {
            assert.ok(typeof word === 'string')
            done()
        }, done)
    })

    it('should produce a nextWord', function (done) {
        this.timeout(5000)
        
        // note: this requires TEST_API_KEY to be set to succeed...
        const i = new BaseAlgorithm(process.env.TEST_API_KEY)

        i.getNextWord("any").then((word) => {
            assert.ok(typeof word === 'string')
            done()
        }, done)
    })

    it('should produce only 1 nextWord', function (done) {
        this.timeout(5000)
        
        // note: this requires TEST_API_KEY to be set to succeed...
        const i = new BaseAlgorithm(process.env.TEST_API_KEY)

        i.getNextWord("any").then(() => {
            assert.ok(i.hasNextWord === false)
            done()
        }, done)
    })
})

class DerivedBaseAlgorithm extends BaseAlgorithm {
    constructor(apiKey) {
        super(apiKey)
    }
}

describe('mkusername.Generator', () => {
    it('ctor should take apiKey', () => {
        assert.doesNotThrow(() => {
            const i = new Generator("123")
        })
    })

    it('ctor should take BaseAlgorithm', () => {
        assert.doesNotThrow(() => {
            const i = new Generator(new BaseAlgorithm("123"))
        })
    })

    it('ctor should take BaseAlgorithm derivation', () => {
        assert.doesNotThrow(() => {
            const i = new Generator(new DerivedBaseAlgorithm("123"))
        })
    })

    it('should generate names', function (done) {
        this.timeout(5000)

        // note: this requires TEST_API_KEY to be set to succeed...
        const i = new Generator(process.env.TEST_API_KEY)
        
        i.generate().then((username) => {
            assert.ok(typeof username === 'string')
            done()
        }, done)
    })
})

describe('mkusername (library)', () => {
    it('should export a simple function', () => {
        assert.ok(typeof mkusernameLibrary === 'function')
    })

    it('should return usernames', function (done) {
        this.timeout(5000)

        // note: this requires TEST_API_KEY to be set to succeed...
        mkusernameLibrary(process.env.TEST_API_KEY)
            .then((username) => {
                assert.ok(typeof username === 'string')
                done()
            }, done)
    })

    it('should export Generator', () => {
        assert.ok(mkusernameLibrary.Generator === Generator)
    })

    it('should export BaseAlgorithm', () => {
        assert.ok(mkusernameLibrary.BaseAlgorithm === BaseAlgorithm)
    })
})

describe('mkusername (cli)', () => {
    it('should generate usernames', function () {
        this.timeout(10000)

        // note: this requires TEST_API_KEY to be set to succeed...
        let res = spawn('node', ['mkusername.js', '-k', process.env.TEST_API_KEY])
        
        assert.ok(res.status == 0)
        assert.ok(res.stdout.toString().indexOf('failed:') === -1)
        assert.ok(res.stderr.toString().indexOf('failed:') === -1)
    })
})