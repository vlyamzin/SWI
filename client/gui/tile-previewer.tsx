import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames';
import {ITileImage} from './tileImages';

export interface ITilePreviewerProps {
    parent: DOMRect
    tile: ITileImage,
    onSelect?: Function;
    onCancel?: Function;
}

interface IState {
    isAnimated: boolean
}

/**
 * @class TilePreviewer
 * @classdesc Component that shows a tile in a separate popup window
 * */
export class TilePreviewer extends Component<ITilePreviewerProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            isAnimated: false
        }
    }
    
    /**
     * React component default hook.
     *
     * @class TilePreviewer
     * @method componentDidMount
     * @public
     * */
    componentDidMount() {
        /* change state after animation is finished */
        setTimeout(() => {
            this.setState({isAnimated: true})
        }, 300);
    }

    /**
     * React component default method. Render a template
     * */
    render() {
        return (
            <div className={classNames('preview-tile', {'preview': this.state.isAnimated})} style={{
                top: this.props.parent.top,
                left: this.props.parent.left,
                width: this.props.parent.width,
                height: this.props.parent.height
            }}>
                <div className="image"
                     style={{backgroundImage: 'url(' + this.props.tile.src + ')'}}></div>
                <div className="button" onClick={(e) => this.submitTile(this.props.tile, e)}>Use</div>
                <div className="button" onClick={(e) => this.cancelSelection(e)}>Cancel</div>
            </div>
        )
    }

    /**
     * Remove a component from the DOM
     *
     * @class TilePreviewer
     * @method destroy
     * @public
     * */
    destroy() {
        this.setState({isAnimated: false});
        ReactDOM.render(null, document.getElementById('preview'));
    }

    /**
     * Event listener of button click. Submit selected tile.
     *
     * @class TilePreviewer
     * @method submitTile
     * @param {ITileImage} tile – Tile object
     * @param {any} event – DOM Event
     * @private
     * */
    private submitTile(tile: ITileImage, event): void {
        event.stopPropagation();
        if (this.props.onSelect) {
            this.props.onSelect(tile);
        }
        this.destroy();
    }

    /**
     * Event listener of button click. Cancel selection and close previewer.
     *
     * @class TilePreviewer
     * @method cancelSelection
     * @param {any} event – DOM Event
     * @private
     * */
    private cancelSelection(event): void {
        event.stopPropagation();
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.destroy();
    }
}
