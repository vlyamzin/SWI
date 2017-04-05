export interface IImagePreloader {
    imageLoaded: Promise<any>
    imageCollection: Array<HTMLImageElement>
}

export class ImagePreloader implements IImagePreloader{
    private imageList: Array<HTMLImageElement>;
    private promiseList: Array<Promise<any>>;

    constructor(protected srcList: Array<string>) {
        this.imageList = [];
        this.promiseList = [];

        srcList.forEach((src:string) => {
            const img = new Image();
            const promise = new Promise<void>((resolve, reject) => {
                img.onload = () => {
                    resolve();
                };
                img.onerror = () => {
                    reject();
                }
            });
            
            img.src = src;
            this.imageList.push(img);
            this.promiseList.push(promise);
        });
    }

    get imageLoaded(): Promise<any> {
        return Promise.all(this.promiseList);
    }

    get imageCollection(): Array<HTMLImageElement> {
        return this.imageList;
    }
}