export interface IMapCoord {
    a: number
    b: number
}

/**
 * @class GameMap
 * @classdesc Represents the game map
 * */
export class GameMap {
    /**
     * Returns the default map for six players. This is the matrix with points of every Hex split by circles
     *
     * @class GameMap
     * @method sixMemberMap
     * @return Array<IMapCoord[]>
     * @static
     * @public
     * */
    public static get sixMemberMap(): Array<Array<IMapCoord>> {
        return [
            [{a:0,b:0}],
            [{a:-1,b:1},{a:0,b:1},{a:1,b:0},{a:1,b:-1},{a:0,b:-1},{a:-1,b:0}],
            [{a:-2,b:2},{a:-1,b:2},{a:0,b:2},{a:1,b:1},{a:2,b:0},{a:2,b:-1},{a:2,b:-2},{a:1,b:-2},{a:0,b:-2},{a:-1,b:-1},
                {a:-2,b:0},{a:-2,b:1}],
            [{a:-3,b:3},{a:-2,b:3},{a:-1,b:3},{a:0,b:3},{a:1,b:2},{a:2,b:1},{a:3,b:0},{a:3,b:-1},{a:3,b:-2},{a:3,b:-3},
                {a:2,b:-3},{a:1,b:-3},{a:0,b:-3},{a:-1,b:-2},{a:-2,b:-1},{a:-3,b:0},{a:-3,b:1},{a:-3,b:2}]
        ]
    }

    /**
     * Returns the coordinates of Race tiles
     *
     * @class GameMap
     * @method sixMemberRaceTiles
     * @return IMapCoord[]
     * @static
     * @public
     * */
    public static get sixMemberRaceTiles(): Array<IMapCoord> {
        return [{a:3,b:-3},{a:0,b:-3},{a:-3,b:0},{a:-3,b:3},{a:0,b:3},{a:3,b:0}];
    }
}
