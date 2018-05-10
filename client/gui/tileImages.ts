import {TileTypeEnum} from '../common/enums/tile-type.enum';
import {RacesEnum} from '../common/enums/races.enum';

export interface ITileImage {
    id: number,
    src: string,
    type: TileTypeEnum,
    image: HTMLImageElement,
    raceId?: RacesEnum
}
/**
 * @class TileImages
 * @classdesc A list of available tiles with paths to image files
 * */
export class TileImages {
    private static basePath = './assets/img/';
    public static get tiles(): Array<ITileImage> {
        return [
            {
                id: 0,
                src: TileImages.basePath + 'coruscant.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 1,
                src: TileImages.basePath + 'adumar_ordmantell.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 2,
                src: TileImages.basePath + 'asteroid.png',
                type: TileTypeEnum.Asteroid,
                image: null
            },
            {
                id: 3,
                src: TileImages.basePath + 'bastion_mygeeto.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 4,
                src: TileImages.basePath + 'bothawui_kothlis.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.BothanSpyNetwork
            },
            {
                id: 5,
                src: TileImages.basePath + 'dagobah_utapau.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 6,
                src: TileImages.basePath + 'dantooine_telos4.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.JediCouncils
            },
            {
                id: 7,
                src: TileImages.basePath + 'empty.png',
                type: TileTypeEnum.Blank,
                image: null
            },
            {
                id: 8,
                src: TileImages.basePath + 'endor_bakura.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 9,
                src: TileImages.basePath + 'fondor_kessel.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 10,
                src: TileImages.basePath + 'ithor_dathomir.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 11,
                src: TileImages.basePath + 'kalee.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 12,
                src: TileImages.basePath + 'kashyyyk.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.Wookiees
            },
            {
                id: 13,
                src: TileImages.basePath + 'korriban_ziost.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.SithOrder
            },
            {
                id: 14,
                src: TileImages.basePath + 'lok.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 15,
                src: TileImages.basePath + 'lyarna.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.BountyHuntersGuild
            },
            {
                id: 16,
                src: TileImages.basePath + 'manaan.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 17,
                src: TileImages.basePath + 'mon_calamari.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.MonCalamari
            },
            {
                id: 18,
                src: TileImages.basePath + 'mustafar_polismassa.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 19,
                src: TileImages.basePath + 'muunilinst.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 20,
                src: TileImages.basePath + 'nebula.png',
                type: TileTypeEnum.Nebula,
                image: null
            },
            {
                id: 21,
                src: TileImages.basePath + 'neimoidia_cato_deko.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.TradeFederation
            },
            {
                id: 22,
                src: TileImages.basePath + 'nubia_malastare.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 23,
                src: TileImages.basePath + 'raxusprime_geonosis.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.CIS
            },
            {
                id: 24,
                src: TileImages.basePath + 'rendili.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 25,
                src: TileImages.basePath + 'rhenvar_felucia.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 26,
                src: TileImages.basePath + 'rodia_falleen.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 27,
                src: TileImages.basePath + 'shako_kuat.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 28,
                src: TileImages.basePath + 'sullust.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 28,
                src: TileImages.basePath + 'supernova.png',
                type: TileTypeEnum.Supernova,
                image: null
            },
            {
                id: 29,
                src: TileImages.basePath + 'taris_bandomeer.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 30,
                src: TileImages.basePath + 'tatooine_adriana.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.JawaClans
            },
            {
                id: 31,
                src: TileImages.basePath + 'wayland.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 32,
                src: TileImages.basePath + 'wormhole_a.png',
                type: TileTypeEnum.Wormhole,
                image: null
            },
            {
                id: 33,
                src: TileImages.basePath + 'wormhole_b.png',
                type: TileTypeEnum.Wormhole,
                image: null
            },
            {
                id: 35,
                src: TileImages.basePath + 'yavin4.png',
                type: TileTypeEnum.Wormhole,
                image: null
            }
        ]
    }
}
//