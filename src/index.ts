export default class Alder {
    ids: number[];

    constructor(auto: boolean = true) {
        this.ids = [];

        if (auto === true) {
            document.body.querySelectorAll('* > style').forEach((element) => {
                if (element.parentElement) {
                    this.parse(element.parentElement);
                }
            });
        }
    }

    parse(element: HTMLElement) {
        if (!element.querySelector('style')) return false;

        const rules = /:|@/;

        let sheet = element.querySelector('style');

        if (sheet && sheet.sheet) {
            Object.values(sheet.sheet.rules).forEach((item) => {
                if (item instanceof CSSStyleRule) {
                    if (item.selectorText.match(rules) == null) {
                        element.querySelectorAll<HTMLElement>(`${item.selectorText}`).forEach((child) => {
                            Object.values(item.style).forEach((prop) => {
                                child.style[prop] = item.style[prop];
                            });
                        });
                    } else if (item.selectorText.includes(':')) {
                        if (!element.id) element.setAttribute('data-alder', this._generate().toString());
                        document.styleSheets[0].insertRule(
                            `${element.id || element.nodeName.toLowerCase()}[data-alder="${element.dataset.alder}"] > ${
                                item.cssText
                            }`,
                            0
                        );
                    }
                }
            });

            sheet.remove();
            return element;
        } else {
            return false;
        }
    }

    _generate(): number {
        let i: number = Math.ceil(Math.random() * 99999);
        if (this.ids.includes(i)) {
            i = this._generate();
        }

        return i;
    }
}
