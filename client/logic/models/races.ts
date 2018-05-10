import {RacesEnum} from '../../common/enums/races.enum';

/**
 * A predefined list of playing races. Used for 'Pick race' input
 * */
const raceList = [
    [RacesEnum.BothanSpyNetwork, 'Bothan Spy Network'],
    [RacesEnum.BountyHuntersGuild, 'Bounty Hunters Guild'],
    [RacesEnum.CIS, 'C.I.S'],
    // [RacesEnum.MandalorianClans, 'The Mandalorian Clans'],
    // [RacesEnum.GalacticEmpire, 'The Galactic Empire'],
    // [RacesEnum.GunganNation, 'The Gungan Nation'],
    // [RacesEnum.Hutts, 'The Hutts'],
    [RacesEnum.JawaClans, 'The Jawa Clans'],
    [RacesEnum.JediCouncils, 'The Jedi Councils'],
    [RacesEnum.MonCalamari, 'The Mon Calamari'],
    // [RacesEnum.RebelAlliance, 'The Rebel Alliance'],
    [RacesEnum.SithOrder, 'The Sith Order'],
    [RacesEnum.TradeFederation, 'The Trade Federation'],
    [RacesEnum.Wookiees, 'The Wookiees']
];

/**
 * A list of races in Map representation
 * */
const races = new Map(raceList.map((a) => {
    return [a[0], a[1]] as [number, string]
}));

export {races};
