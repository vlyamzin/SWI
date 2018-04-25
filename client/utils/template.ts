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

        for (let elem of template) {
            t.innerHTML += elem;
        }

        try {
            parent.appendChild(t.content.firstChild);
        }
        catch (e) {
            console.error('Error in template', e);
        }
    }

    private static getNodeInstance(node: Node|string): Node {

        if (node instanceof Node) {
           return node;
        } else {
            try {
                let instance;

                instance = document.getElementById(node);

                if (instance) {
                    return instance;
                }

                instance = document.getElementsByClassName(node);

                if (instance && instance.length > 0) {
                    return instance[0];
                }

                instance = document.getElementsByTagName(node);

                if (instance && instance.length > 0) {
                    return instance[0];
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