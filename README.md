# mkusername

> make a unique username

A tool for generating usernames, using either a [cli](#cli) or a [library](#library).

# How

> Requires an api key (free) from [here](https://www.wordsapi.com/pricing)

## CLI

```
λ set USERNAME_API_KEY=<yourKey>
λ mkusername
trendyvivendi
```

## Library

```
const mkusername = require('mkusername')
mkusername('<yourKey>').then((username) => { console.log(username) })
```

### Custom algorithms

You can dervive from `BaseAlgorithm` and create your own.

```
const BaseAlgorithm = require('mkusername').BaseAlgorithm

class MyAlgo extends BaseAlgorithm {
    constructor(apiKey) {
        super(apiKey)
    }

    getBaseWord() {
        // return a promise that resolves to a string
    }

    get hasNextWord() {
        // return a bool indicating if the algorithm has another word to provide
    }

    getNextWord(baseWord) {
        // return a promise that resolves to a string
    }
}
```

# License

MIT