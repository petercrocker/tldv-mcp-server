import { WriteStream } from "tty";

/**
 * Logger that writes to stderr to avoid interfering with MCP's stdio communication
 */
class Logger {
  private stream: WriteStream;

  constructor() {
    this.stream = process.stderr;
  }

  private log(level: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data })
    };

    this.stream.write(JSON.stringify(logEntry) + '\n');
  }

  info(message: string, data?: any) {
    this.log('INFO', message, data);
  }

  error(message: string, data?: any) {
    this.log('ERROR', message, data);
  }

  debug(message: string, data?: any) {
    this.log('DEBUG', message, data);
  }

  warn(message: string, data?: any) {
    this.log('WARN', message, data);
  }
}

export const logger = new Logger();