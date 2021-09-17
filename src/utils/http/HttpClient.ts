// Http without using some library like axios

import https from 'https';

export class HttpClient {
  get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = https.get(url, (res) => {
        if (!res) {
          return reject(new Error('Error running HTTP GET'));
        }
        // reject on bad status
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error('statusCode=' + res.statusCode));
        }
        // cumulate data
        let body: Buffer[] = [];
        res.on('data', (chunk) => {
          body.push(chunk);
        });
        // resolve on end
        res.on('end', () => {
          try {
            body = JSON.parse(Buffer.concat(body).toString());
          } catch (e) {
            reject(e);
          }
          resolve(body);
        });
      });
      // reject on request error
      req.on('error', (err) => {
        // This is not a "Second reject", just a different sort of failure
        reject(err);
      });
      // IMPORTANT
      req.end();
    });
  }
}
