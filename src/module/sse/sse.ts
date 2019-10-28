import { Observable, Subscription } from 'rxjs';
import { ServerResponse } from 'http';
import { classToPlain } from 'class-transformer';
import * as stringify from 'fast-stable-stringify';

export class SSE {
  private keepAlive;
  private isClose = false;

  subscriptions: Subscription[] = [];

  constructor(private readonly res: ServerResponse) {
    const keepAlive = setInterval(() => {
      if (!this.isClose) {
        this.send('keep-alive', '', true);
      }
    }, 20000);
  }

  send(data: any, field: string, end = false) {
    if (field === 'data') {
      data = this.serialize(data);
    }

    let content = `${field}: ${data}\n`;
    if (end) content += '\n';
    this.res.write(content);
  }

  sendEvent(data: any, eventName: string = 'message') {
    this.send(eventName, 'event');
    this.send(data, 'data', true);
  }

  subscribe(source$: Observable<any>, eventName?: string) {
    const subscription = source$.subscribe(data => {
      this.sendEvent(data, eventName);
    });

    this.subscriptions.push(subscription);
  }

  unsubscribeAll() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  close() {
    console.log('call close');
    this.isClose = true;
    clearInterval(this.keepAlive);
    this.unsubscribeAll();
  }

  private serialize(data: any): string {
    return stringify(classToPlain(data));
  }
}
