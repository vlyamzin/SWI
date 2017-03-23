import * as WebSocket from 'ws';

import { IndexRoute } from "./routes/index";

interface App {
    port: number
}

interface ISocketMessage {
    command: string,
    data: any
}

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: App;
    private webSocketServer: WebSocket.Server;
    private router: any; // TODO
    private allClients: Object = {};
    private namedClients: Object = {};

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @param {number} port
     * @static
     * @return {Object} Returns the newly created injector for this app.
     */
    public static bootstrap(port: number): Server {
        return new Server(port);
    }

    /**
     * Constructor.
     *
     * @class Server
     * @param {number} port
     * @constructor
     */
    constructor(port: number) {
        this.app = {
            port
        };
        this.config(); // configure application
        this.routes(); // add routes
        this.api(); // add api
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        //empty for now
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        this.webSocketServer = new WebSocket.Server({
            port: this.app.port
        });

        this.webSocketServer.on('connection', (ws) => {
            let id = Math.random();

            this.allClients[id] = ws;

            console.log("new connection " + id);

            if (ws.readyState === ws.OPEN) {
                const usersCount = Object.keys(this.namedClients).length;

                if (usersCount < 2) {
                    this.sendData(ws, {
                        command: 'authorize'
                    });
                }
                else {
                    this.sendData(ws, {
                        command: 'signed',
                        data: {
                            role: 'viewer'
                        }
                    });
                }
            }

            ws.on('message', (data: string) => {
                let message: ISocketMessage;

                try {
                    message = JSON.parse(data);
                } catch(e) {
                    console.log(e);
                }
                console.log('message received ' + message);

                if (typeof message.command !== 'string') {
                    return;
                }

                this.processRoute(message, ws, id);

                // for(let key in allClients) {
                //     console.log(key);
                //     allClients[key].send(message);
                // }
            });

            ws.on('close', () => {
                console.log('connection is closed ' + id);
                delete this.allClients[id];
            });

        });
    }

    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    public routes() {
        // let router: express.Router;
        //
        // router = express.Router();
        //
        // IndexRoute.create(router);

        // this.app.use(router); // use router middleware
        this.router = {
            'register': (ws, clientId, userName) => {
                if (typeof this.namedClients[userName] === 'undefined') {
                    this.namedClients[userName] = clientId;

                    this.sendData(ws, {
                        command: 'signed',
                        data: {
                            role: 'player'
                        }
                    });
                } else {
                    this.sendData(ws, {
                        command: 'authorize'
                    });
                }
            }
        }
    }

    private sendData(ws, data) {
        ws.send(JSON.stringify(data));
    }

    private processRoute(socketMessage: ISocketMessage, ws, clientId: number) {
        const method = this.router[socketMessage.command];

        console.log(socketMessage, ws, clientId);

        if (typeof method === 'function') {
            method(ws, clientId, socketMessage.data);
        } else {
            this.sendData(ws, {
                error: 'no such command'
            });
        }
    }
}