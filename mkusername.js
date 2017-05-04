const mkUsername = require('./')
const argv = require('yargs')
    .version(require(`${__dirname}/package.json`).version)
    .epilog('Made with <3 by @bengreenier')
    .describe('k', 'api key (optional, will try env USERNAME_API_KEY if not present)')
    .alias('k', 'key')
    .argv

const key = argv.k || process.env.USERNAME_API_KEY

if (typeof key !== 'string') {
    console.error('failed: missing or invalid api key (try --key <yourKey>)')
    process.exit(-1)
}

mkUsername(key).then((username) => {
    console.log(username)
}, (err) => {
    console.error(`failed: ${err}`)
    process.exit(-1)
})