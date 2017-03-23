export interface ICommunicationService {
    sendData: (data: any) => void
}

interface ISocketMessage {
    command: string,
    data: any
}

/**
 *
 * @class CommunicationService
 */
class CommunicationService implements ICommunicationService {
    private socket: WebSocket;
    private userName: string;

    /**
     * Constructor.
     *
     * @class CommunicationService
     * @constructor
     */
    constructor () {
        this.socket = new WebSocket("ws://localhost:8081"); // TODO move to constants

        this.socket.onopen = () => {
            this.onConnectionOpen();
        };

        this.socket.onmessage = (e: MessageEvent) => {
            try {
                this.processData(JSON.parse(e.data));
            } catch(ex) {
                console.log(ex);
            }
        }
    }

    private onConnectionOpen(): void {

    }

    /**
     * Send object to socket
     * @param {ISocketMessage} socketMessage
     */
    sendData(socketMessage: ISocketMessage): void {
        this.socket.send(JSON.stringify(socketMessage));
    }

    /**
     * Process socket response
     * @param {ISocketMessage} socketMessage
     */
    processData(socketMessage: ISocketMessage): void {
        console.log(socketMessage);
        switch (socketMessage.command) {
            case 'authorize':
                this.userName = prompt('Enter your nickname');

                this.sendData({
                    command: 'register',
                    data: this.userName
                });
                break;
            case 'signed':
                alert(`signed in! Role: ${socketMessage.data.role}`);
                break;
        }
    }
}

export let communicationService: ICommunicationService = new CommunicationService();