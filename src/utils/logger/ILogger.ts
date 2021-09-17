export interface ILogger {
  // Adds INFO prefix string to the log string
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  custom(_filename: string, message: string): void;
}
