import Express from './Express';
import Logger from '../../utils/logger/Logger';

class App {
  // Clear the console
  public clearConsole(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  // Loads your Server
  public loadServer(): void {
    Logger.info('Server :: Loading Express ...');

    Express.init();
  }
}

export default new App();
