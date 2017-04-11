import {IBoard, Board} from './gui/board';
import {IImagePreloader, ImagePreloader} from './utils/imagePreloader';
import {TileImages, ITileImage} from './gui/tileImages';

let imageList;

module UI {

    class Game {
        private width: number;
        private height: number;
        private board: IBoard;

        constructor() {
            imageList = new ImagePreloader<ITileImage>(TileImages.tiles);
            this.width = window.innerWidth;
            this.height = window.innerHeight;


            window.addEventListener('resize', this.resizeCanvas.bind(this), false);
            imageList.imageLoaded.then(() => {
                this.board = new Board(this.width, this.height);
            });
        }

        /**
         * Resize the whole screen
         * */
        public resizeCanvas(): void {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.board.draw(this.width, this.height);
        }
    }

    new Game();


}
export {imageList};     // it is singleton