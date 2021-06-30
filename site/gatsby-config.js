require('source-map-support').install();

require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'es2020',
        esModuleInterop: true,
        sourceMap: true,
    },
})

require("dotenv").config({ path: ".env.development" })

module.exports = require('./gatsby-config.ts');
