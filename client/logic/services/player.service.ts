import {Service} from 'typedi';
import {Player} from '../models/player';
import {shuffle} from '../../utils/array-shuffle';
import {ITileImage, TileImages} from '../../gui/tileImages';
import {TileTypeEnum} from '../../common/enums/tile-type.enum';

export interface IPlayerCreateData {
    name: string,
    color: string,
    race: number,
    tileList?: Array<ITileImage>
}

export interface IPlaterService {
    create: Function
}

/**
 * @class PlayerService
 * @classdesc A service that creates, collects and stores player's data
 * */
@Service()
export class PlayerService implements IPlaterService{
    private _player: Player;

    constructor() {
        const cache = localStorage.getItem('player');
        if (cache) {
            this._player = new Player(JSON.parse(cache));
        }
    }

    /**
     * Create a Player
     *
     * @class PlayerService
     * @method create
     * @param {IPlayerCreateData} data – Main player data
     * @return Promise<Player> A Player object
     * @public
     * */
    public create(data: IPlayerCreateData): Promise<Player> {
        /* @TODO add server call*/
        this._player = new Player(data);
        /* end todo*/

        this.saveUserState();

        return new Promise<Player>((resolve) => {
            resolve(this._player);
        })
    }

    /**
     * Returns a Player instance
     *
     * @class PlayerService
     * @method player
     * @getter
     * @return Player
     * @public
     * */
    public get player(): Player {
        return this._player;
    }

    /**
     * Returns the race Id value of the running player
     *
     * @class PlayerService
     * @method raceId
     * @getter
     * @return number
     * @public
     * */
    public get raceId(): number {
        return this._player.raceId;
    }

    /**
     * Returns the cached list of tiles available for player or creates new one
     *
     * @class PlayerService
     * @method raceId
     * @getter
     * @return number
     * @public
     * */
    public get userTiles(): Array<ITileImage> {
        return this._player.tileList.length > 0 ? this._player.tileList : this.generateTileList();
    }

    /**
     * Get
     *
     * @class PlayerService
     * @method generateTileList
     * @return number
     * @public
     * */
    private generateTileList(): Array<ITileImage> {
        const raceTile = TileImages.tiles.find(t => t.raceId === this._player.raceId);
        const leftTiles = TileImages.tiles.filter((t) => {
            return t.id !== raceTile.id &&
                t.type !== TileTypeEnum.Race &&
                t.id !== 0;
        });

        const userTiles = shuffle<ITileImage>(leftTiles).slice(0, 5);
        userTiles.push(raceTile);
        this._player.tileList = userTiles;

        this.saveUserState();

        return this._player.tileList;
    }

    /**
     * Make a server call to save a user data
     * @ TODO update to server call
     *
     * @class PlayerService
     * @method saveUserState
     * @public
     * */
    private saveUserState(): void {
        const obj = {
            name: this._player['_name'],
            color: this.player['_color'],
            race: this.player['_race'],
            tileList: this.player['tileList']
        };
        localStorage.setItem('player', JSON.stringify(obj));
    }
}