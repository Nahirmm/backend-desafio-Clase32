import parseArgs from 'minimist'

const options = { default: {puerto: 8080}}
export const PORT = parseArgs(process.argv, options).puerto
