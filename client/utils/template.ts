export interface IViewEvents {
    [key: string]: Array<{[key:string]: string}>
}

export class Template {

    public static renderElement(template: string, node: Node|string): void {
        const t = document.createElement('template');
        const parent = this.getNodeInstance(node);

        t.innerHTML = template;

        try {
            parent.appendChild(t.content.firstChild);
        }
        catch (e) {
            console.log('Error in template', e);
        }
    }

    public static renderElements(template: string[], node: Node): void {
        const t = document.createElement('template');
        const parent = this.getNodeInstance(node);

        for (const elem of template) {
            t.innerHTML += elem;
        }

        try {
            parent.appendChild(t.content.firstChild);
        }
        catch (e) {
            console.error('Error in template', e);
        }
    }

    public static attachEvents(events: IViewEvents, context: unknown): void {
        for(const key in events) {
            if (Object.prototype.hasOwnProperty.call(events, key)) {
                const selectorType = key.charAt(0);
                let node: HTMLElement | Element;
                let elemList: HTMLCollectionOf<Element>;

                switch (selectorType) {
                    case '.':
                        elemList = document.getElementsByClassName(key.substring(1, key.length));
                        if (elemList && elemList.length > 0) {
                            node = elemList[0];
                        }
                        break;
                    case '#':
                        node = document.getElementById(key.substring(1, key.length));
                        break;
                    default:
                        elemList = document.getElementsByTagName(key);
                        if (elemList && elemList.length > 0) {
                            node = elemList[0];
                        }
                }

                if (node) {
                    for (const evt of events[key]) {
                        const k = Object.keys(evt)[0];
                        const handler = context[evt[k]] as () => unknown;
                        node.addEventListener(k, handler.bind(context), false);
                    }
                }
            }
        }
    }

    private static getNodeInstance(node: Node|string): Node {

        if (node instanceof Node) {
           return node;
        } else {
            try {
                const instance: HTMLElement = document.getElementById(node);
                let nodeList: HTMLCollectionOf<Element>;

                if (instance) {
                    return instance;
                }

                nodeList = document.getElementsByClassName(node);

                if (nodeList && nodeList.length > 0) {
                    return nodeList[0];
                }

                nodeList = document.getElementsByTagName(node);

                if (nodeList && nodeList.length > 0) {
                    return nodeList[0];
                }

                throw new Error('Can\'t find parent node. Element was added to <body>');
            }
            catch (e) {
                console.error(e);
                return document.body;
            }
        }
    }
}
