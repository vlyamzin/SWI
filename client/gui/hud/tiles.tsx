import React, {Component, SyntheticEvent} from 'react';
import ReactDOM from 'react-dom';
import {ITileImage} from '../tileImages';
import {TilePreviewer} from '../tile-previewer';
import {CacheService} from '../../logic/services/cache.service';

export interface ITilesProps {
    tiles: ITileImage[],
    splitRaceTile?: boolean
}

/**
 * @class Tiles
 * @classdesc Component that represents a list of tiles. Used in the HUD
 * */
export class Tiles extends Component<ITilesProps, unknown> {
    constructor(props: ITilesProps,
                private cacheService: CacheService) {
        super(props);
    }

    /**
     * React component default method. Render a template
     * @public
     * */
    render(): JSX.Element[] {
        return (
            this.getTiles()
        )
    }

    /**
     * Generate a template from incoming properties
     *
     * @class Tiles
     * @method getTiles
     * @private
     * */
    private getTiles() {
        return this.props.tiles.map((tile: ITileImage, i) => {
            return <div key={tile.id}
                        className={'hud-tiles-card'}
                        style={{
                            backgroundImage: 'url(' + tile.src + ')',
                            transform: 'translateX(' + String(-i / 2 * 250 + 30) + 'px)',
                        }}
                        onClick={(e) => {
                            this.selectTile(e, tile)
                        }}>
            </div>
        })
    }

    /**
     * Event listener of Tile click. Mark current tile as selected and render it in the Preview popup.
     *
     * @class Tiles
     * @method selectTile
     * @param {any} event - DOM event
     * @param {ITileImage} tile – tile object
     * @private
     * */
    private selectTile(event: SyntheticEvent, tile: ITileImage): void {
        event.stopPropagation();
        event.currentTarget.parentElement.classList.add('preview');

        ReactDOM.render(
            <TilePreviewer
                parent={event.currentTarget.getBoundingClientRect()}
                tile={tile} onSelect={this.cacheTile}></TilePreviewer>,
            document.getElementById('preview')
        )
    }


    /**
     * Check if a tile is a race tile.
     *
     * @class Tiles
     * @method isRaceTile
     * @param {number} index – index of tile in a list
     * @return boolean
     * @private
     * */
    private isRaceTile(index: number): boolean {
        if (!this.props.splitRaceTile) {
            return false;
        }

        return this.props.tiles.length - 1 === index;
    }

    /**
     * Cache a tile in the Cache service for the future uses.
     *
     * @class Tiles
     * @method cacheTile
     * @param {ITileImage} tile – tile object
     * @private
     * */
    private cacheTile = (tile: ITileImage): void => {
        this.cacheService.tile = tile;
    }
}
