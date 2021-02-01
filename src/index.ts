/**
 * The Alder class. The constructor is provided as a convenience function for styling all elements in the body automatically.  It is not necessary to initialise a new Alder class; you can just call the static methods directly instead (e.g. `Alder.parse(element)`).
 */
export default class Alder {
    /**
     * Array of all unique IDs which Alder uses to scope elements.
     */
    private static ids: number[];

    /**
     *
     * @param auto If set to `true`, Alder will automatically scope all elements in the `<body>` which have a `<style>` element as a child. If set to false, the Alder.scope() method will need to be called manually.
     */
    constructor(auto: boolean = true) {
        if (auto === true) {
            document.body.querySelectorAll('* > style').forEach((element) => {
                if (element.parentElement) {
                    Alder.scope(element.parentElement);
                }
            });
        }
    }

    /**
     * Scopes a given HTML element using the element's first `<style>` element.
     * @param element The HTML element to apply scoped-css to.  Note that this element **must** have a `<style>` element as a child or the method will return `false`.
     */
    static scope(element: HTMLElement) {
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
                        if (!element.id) element.setAttribute('data-alder', Alder.generate().toString());
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

    /**
     * Generates a unique ID number for Alder's scoping system.
     */
    private static generate(): number {
        let i: number = Math.ceil(Math.random() * 99999);
        if (this.ids.includes(i)) {
            i = Alder.generate();
        }

        return i;
    }
}
