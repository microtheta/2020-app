export function log(msg: string | any[] = '', type: (keyof Console) = 'log') {
    if (!msg) {
        return
    }
    let logger = console.log
    if (console[type]) {
        logger = console[type]
    }

    if (msg.constructor.name === 'Array') {
        logger(...msg)
    } else {
        logger(msg)
    }
}