import {Loader} from 'pixi.js';
import {singleton} from 'tsyringe';

interface IImage {
    src: string,
    image: HTMLImageElement,
    name: string
}

export interface IImagePreloader {
    load: (srcList: Array<unknown>) => void
}

@singleton()
export class ImagePreloader<T extends IImage> implements IImagePreloader {
    private _loader = Loader.shared;

    public load(srcList: Array<T>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            srcList.forEach(item => this._loader.add(item.name, item.src));
            this._loader.load();

            // this._loader.onLoad.add((loader) => console.log(loader)); // called once per loaded file
            this._loader.onError.add((err) => {
                // called once per errored file
                console.error(err);
                reject(err);
            });
            this._loader.onComplete.add(() => {
                // called once when the queued resources all load.
                console.log('All resources are loaded');
                resolve(true);
            });
        })

    }

    public get loader(): Loader {
        return this._loader;
    }
}
