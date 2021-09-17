/**
 * Creates & maintains the log
 */

import * as fs from 'fs';
import * as path from 'path';
import { ILogger } from './ILogger';

class Logger implements ILogger {
  public baseDir: string;
  public fileName: string;
  public linePrefix: string;

  public today: Date = new Date();

  constructor() {
    const _dateString = `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`;
    const _timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;

    this.baseDir = path.join(__dirname, '../../.logs/');
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, {
        recursive: true,
      });
    }

    this.fileName = `${_dateString}.log`;
    this.linePrefix = `[${_dateString} ${_timeString}]`;
  }

  // Adds INFO prefix string to the log string
  public info(message: string): void {
    console.log('\x1b[32m%s\x1b[0m', '[INFO] :: ' + message.split(/r?\n/)[0]);
    this.addLog('INFO', message);
  }

  // Adds WARN prefix string to the log string
  public warn(message: string): void {
    console.log('\x1b[43m%s\x1b[0m', '[WARN] :: ' + message.split(/r?\n/)[0]);
    this.addLog('WARN', message);
  }

  // Adds ERROR prefix string to the log string
  public error(message: string): void {
    // Line break and show the first line
    console.log('\x1b[31m%s\x1b[0m', '[ERROR] :: ' + message.split(/r?\n/)[0]);

    this.addLog('ERROR', message);
  }

  // Adds the custom prefix string to the log string
  public custom(_filename: string, message: string): void {
    this.addLog(_filename, message);
  }

  /**
   * Creates the file if does not exist, and
   * append the log kind & string into the file.
   */
  private addLog(_kind: string, message: string): void {
    const logFilePath = `${this.baseDir}${this.fileName}`;
    const formattedMessage = `${this.linePrefix} [${_kind.toUpperCase()}] ${message}\n`;
    fs.appendFile(logFilePath, formattedMessage, (_err) => {
      if (_err) {
        return console.log('\x1b[31m%s\x1b[0m', 'Error appending data to log file');
      }
    });
  }
}

export default new Logger();
