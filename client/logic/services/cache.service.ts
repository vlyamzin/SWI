// import {Service} from 'typedi';
import {ITileImage} from '../../gui/tileImages';
import {IMapCoord} from '../map';
import {singleton} from 'tsyringe';

/**
 * @class
 * @classdesc The main service to cache the game info such tiles on HUD or part of the map which was selected
 * */
@singleton()
export class CacheService {
    /**
     * @param {ITileImage} – Cached tile which was selected from the HUD
     * @private
     * */
    private _tile: ITileImage;
    /**
     * @param {IMapCoord} – Cached coordinates of the selected Hex on the Board
     * @private
     * */
    private _mapSection: IMapCoord;

    /**
     * Returns cached tile
     *
     * @class CacheService
     * @method tile
     * @getter
     * @return {ITileImage}
     * @public
     * */
    public get tile(): ITileImage {
        return this._tile;
    }

    /**
     * Cache the tile
     *
     * @class CacheService
     * @method tile
     * @setter
     * @public
     * */
    public set tile(value: ITileImage) {
        this._tile = value;
    }

    /**
     * Returns cached coordinates of the Hex on the Board
     *
     * @class CacheService
     * @method mapSection
     * @getter
     * @return {IMapCoord}
     * @public
     * */
    public get mapSection(): IMapCoord {
        return this._mapSection;
    }

    /**
     * Cache coordinates of the Hex
     *
     * @class CacheService
     * @method mapSection
     * @setter
     * @public
     * */
    public set mapSection(value: IMapCoord) {
        this._mapSection = value;
    }

    /**
     * Clear all cached data
     *
     * @class CacheService
     * @method clear
     * @public
     * */
    public clear(): void {
        this._tile = null;
        this._mapSection = null;
    }
}
