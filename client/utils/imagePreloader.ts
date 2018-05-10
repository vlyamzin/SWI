interface IImage {
    src: string,
    image: HTMLImageElement
}

export interface IImagePreloader {
    imageLoaded: Promise<any>
    imageCollection: Array<IImage>
}

export class ImagePreloader<T extends IImage> implements IImagePreloader{
    private imageList: Array<T>;
    private promiseList: Array<Promise<any>>;

    constructor(protected srcList: Array<T>) {
        this.imageList = [];
        this.promiseList = [];

        srcList.forEach((i:T) => {
            const img = new Image();
            const promise = new Promise<void>((resolve, reject) => {
                img.onload = () => {
                    resolve();
                };
                img.onerror = () => {
                    reject();
                }
            });
            
            img.src = i.src;
            i.image = img;
            this.imageList.push(i);
            this.promiseList.push(promise);
        });
    }

    get imageLoaded(): Promise<any> {
        return Promise.all(this.promiseList);
    }

    get imageCollection(): Array<T> {
        return this.imageList;
    }
}