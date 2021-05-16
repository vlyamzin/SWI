import {TileTypeEnum} from '../common/enums/tile-type.enum';
import {RacesEnum} from '../common/enums/races.enum';

export interface ITileImage {
    id: number,
    name: string,
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
                name: 'coruscant',
                src: TileImages.basePath + 'coruscant.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 1,
                name: 'adumar_ordmantell',
                src: TileImages.basePath + 'adumar_ordmantell.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 2,
                name: 'asteroid',
                src: TileImages.basePath + 'asteroid.png',
                type: TileTypeEnum.Asteroid,
                image: null
            },
            {
                id: 3,
                name: 'bastion_mygeeto',
                src: TileImages.basePath + 'bastion_mygeeto.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 4,
                name: 'bothawui_kothlis',
                src: TileImages.basePath + 'bothawui_kothlis.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.BothanSpyNetwork
            },
            {
                id: 5,
                name: 'dagobah_utapau',
                src: TileImages.basePath + 'dagobah_utapau.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 6,
                name: 'dantooine_telos4',
                src: TileImages.basePath + 'dantooine_telos4.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.JediCouncils
            },
            {
                id: 7,
                name: 'empty',
                src: TileImages.basePath + 'empty.png',
                type: TileTypeEnum.Blank,
                image: null
            },
            {
                id: 8,
                name: 'endor_bakura',
                src: TileImages.basePath + 'endor_bakura.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 9,
                name: 'fondor_kessel',
                src: TileImages.basePath + 'fondor_kessel.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 10,
                name: 'ithor_dathomir',
                src: TileImages.basePath + 'ithor_dathomir.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 11,
                name: 'kalee',
                src: TileImages.basePath + 'kalee.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 12,
                name: 'kashyyyk',
                src: TileImages.basePath + 'kashyyyk.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.Wookiees
            },
            {
                id: 13,
                name: 'korriban_ziost',
                src: TileImages.basePath + 'korriban_ziost.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.SithOrder
            },
            {
                id: 14,
                name: 'lok',
                src: TileImages.basePath + 'lok.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 15,
                name: 'lyarna',
                src: TileImages.basePath + 'lyarna.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.BountyHuntersGuild
            },
            {
                id: 16,
                name: 'manaan',
                src: TileImages.basePath + 'manaan.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 17,
                name: 'mon_calamari',
                src: TileImages.basePath + 'mon_calamari.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.MonCalamari
            },
            {
                id: 18,
                name: 'mustafar_polismassa',
                src: TileImages.basePath + 'mustafar_polismassa.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 19,
                name: 'muunilinst',
                src: TileImages.basePath + 'muunilinst.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 20,
                name: 'nebula',
                src: TileImages.basePath + 'nebula.png',
                type: TileTypeEnum.Nebula,
                image: null
            },
            {
                id: 21,
                name: 'neimoidia_cato_deko',
                src: TileImages.basePath + 'neimoidia_cato_deko.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.TradeFederation
            },
            {
                id: 22,
                name: 'nubia_malastare',
                src: TileImages.basePath + 'nubia_malastare.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 23,
                name: 'raxusprime_geonosis',
                src: TileImages.basePath + 'raxusprime_geonosis.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.CIS
            },
            {
                id: 24,
                name: 'rendili',
                src: TileImages.basePath + 'rendili.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 25,
                name: 'rhenvar_felucia',
                src: TileImages.basePath + 'rhenvar_felucia.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 26,
                name: 'rodia_falleen',
                src: TileImages.basePath + 'rodia_falleen.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 27,
                name: 'shako_kuat',
                src: TileImages.basePath + 'shako_kuat.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 28,
                name: 'sullust',
                src: TileImages.basePath + 'sullust.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 29,
                name: 'supernova',
                src: TileImages.basePath + 'supernova.png',
                type: TileTypeEnum.Supernova,
                image: null
            },
            {
                id: 30,
                name: 'taris_bandomeer',
                src: TileImages.basePath + 'taris_bandomeer.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 31,
                name: 'tatooine_adriana',
                src: TileImages.basePath + 'tatooine_adriana.png',
                type: TileTypeEnum.Race,
                image: null,
                raceId: RacesEnum.JawaClans
            },
            {
                id: 32,
                name: 'wayland',
                src: TileImages.basePath + 'wayland.png',
                type: TileTypeEnum.Planet,
                image: null
            },
            {
                id: 33,
                name: 'wormhole_a',
                src: TileImages.basePath + 'wormhole_a.png',
                type: TileTypeEnum.Wormhole,
                image: null
            },
            {
                id: 34,
                name: 'wormhole_b',
                src: TileImages.basePath + 'wormhole_b.png',
                type: TileTypeEnum.Wormhole,
                image: null
            },
            {
                id: 35,
                name: 'yavin4',
                src: TileImages.basePath + 'yavin4.png',
                type: TileTypeEnum.Wormhole,
                image: null
            }
        ]
    }
}
//
