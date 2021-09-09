import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWebSocketActions } from '../models';
export class WebSocketManager {
    private webSocket = new WebSocket(environment.backendWSUrl); 
    pingTimeout: any;
    constructor() {
        this.webSocket.onopen = () => this.heartbeat
        this.webSocket.onclose = () => {
            clearTimeout(this.pingTimeout);
        }
        this.pingTimeout = setTimeout(() => {
            this.webSocket.close();
        }, 30000 + 1000);
    }

    private heartbeat() {
        clearTimeout(this.pingTimeout);
    }

    listenForAction<T>(action: IWebSocketActions) {
        const value$ = new BehaviorSubject<T>(null as unknown as T);
        this.webSocket.onmessage = (message) => {
            let data = JSON.parse(message.data || '{}') as { action: IWebSocketActions; payload: T }
            if (data.action === action) {
                value$.next(data.payload);
            }
        }
        return value$;
    }
}