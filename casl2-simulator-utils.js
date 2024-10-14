export class Logger {
    constructor() {
        this.logs = [];
    }

    log(message) {
        const logEntry = `[${new Date().toISOString()}] ${message}`;
        this.logs.push(logEntry);
        console.log(logEntry);
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }
}
