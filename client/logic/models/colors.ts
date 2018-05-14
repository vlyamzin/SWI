import {PlayerColorsEnum} from '../../common/enums/player-colors.enum';

export interface IColorObject {
    name: string;
    hash: string;
    rgb: string;
}

const colorList = [
    [PlayerColorsEnum.Black, {name: 'Black', hash: '#1d1d1d', rgb: 'rgb(29,29,29)'}],
    [PlayerColorsEnum.Blue, {name: 'Blue', hash: '#2d89ef', rgb: 'rgb(45,137,239)'}],
    [PlayerColorsEnum.Green, {name: 'Green', hash: '#00a300', rgb: 'rgb(0,163,0)'}],
    [PlayerColorsEnum.Purple, {name: 'Purple', hash: '#7e3878', rgb: 'rgb(126,56,120)'}],
    [PlayerColorsEnum.Yellow, {name: 'Yellow', hash: '#ffc40d', rgb: 'rgb(255,196,13)'}],
    [PlayerColorsEnum.Red, {name: 'Red', hash: '#ee1111', rgb: 'rgb(238,17,17)'}]
];

const colors = new Map(colorList.map((a) => {
    return [a[0], a[1]] as [number, IColorObject]
}));

export {colors};

