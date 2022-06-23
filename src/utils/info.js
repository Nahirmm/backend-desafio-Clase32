import os from 'os'
const numCPUs = os.cpus().length

export function info() {
    const argumentoDeEntrada = process.argv
    const sistemaOperativo = process.platform
    const versionNodeJS = process.version
    const memoriaTotalReservada = process.memoryUsage().rss
    const pathDeEjecucion = process.title
    const processId = process.pid
    const carpetaDelProyecto = process.cwd()
    const cantProcesadores = numCPUs
    return {argumentoDeEntrada, sistemaOperativo, versionNodeJS, memoriaTotalReservada, pathDeEjecucion, processId, carpetaDelProyecto, cantProcesadores}
}


