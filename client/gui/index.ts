import {IBoard, Board} from './board';

module UI {
    class Game {
        private width: number;
        private height: number;
        private board: IBoard;

        constructor() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.board = new Board(this.width, this.height);
            window.addEventListener('resize', this.resizeCanvas.bind(this), false);
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