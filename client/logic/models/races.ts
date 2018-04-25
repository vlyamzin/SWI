import {RacesEnum} from '../../common/enums/races.enum';

const raceList = [
    [RacesEnum.BothanSpyNetwork, 'Bothan Spy Network'],
    [RacesEnum.BountyHuntersGuild, 'Bounty Hunters Guild'],
    [RacesEnum.CIS, 'C.I.S'],
    [RacesEnum.MandalorianClans, 'The Mandalorian Clans'],
    [RacesEnum.GalacticEmpire, 'The Galactic Empire'],
    [RacesEnum.GunganNation, 'The Gungan Nation'],
    [RacesEnum.Hutts, 'The Hutts'],
    [RacesEnum.JawaClans, 'The Jawa Clans'],
    [RacesEnum.JediCouncils, 'The Jedi Councils'],
    [RacesEnum.MonCalamari, 'The Mon Calamari'],
    [RacesEnum.RebelAlliance, 'The Rebel Alliance'],
    [RacesEnum.SithOrder, 'The Sith Order'],
    [RacesEnum.TradeFederation, 'The Trade Federation'],
    [RacesEnum.Wookiees, 'The Wookiees']
];

const races = new Map(raceList.map((a) => {
    return [a[0], a[1]] as [number, string]
}));

export {races};
