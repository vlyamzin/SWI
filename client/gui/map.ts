export interface IMapCoord {
    a: number
    b: number
}

export class GameMap {
    public static get sixMemberMap(): Array<Array<IMapCoord>> {
        return [
            [{a: 0, b: 0}],
            [{a: -1, b: 1}, {a: 0, b: 1}, {a: 1, b: 0}, {a: 1, b: -1}, {a: 0, b: -1}, {a: -1, b: 0}],
            [{a: -2, b: 2}, {a: -1, b: 2}, {a: 0, b: 2}, {a: 1, b: 1}, {a: 2, b: 0}, {a: 2, b: -1}, {a: 2, b: -2}, {a: 1, b: -2}, {a: 0, b: -2}, {a: -1, b:-1}, {a:-2,b:0},{a:-2,b:1}]
        ]
    }
}