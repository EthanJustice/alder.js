"use strict";
class Alder {
    constructor(auto = true) {
        this.ids = [];

        if (auto == true) {
            document.body
                .querySelectorAll("* > style")
                .forEach(element => this.parse(element.parentElement));
        }
    }

    parse(element) {
        if (!element) return;

        if (!element.querySelector("style")) return element;

        let sheet = element.querySelector("style");
        let rules = /:|@/;
        Object.values(sheet.sheet.rules).forEach(item => {
            if (item.selectorText.match(rules) == null) {
                element.querySelectorAll(`${item.selectorText}`).forEach(child => {
                    Object.values(item.style).forEach(prop => {
                        child.style[prop] = item.style[prop];
                    });
                });
            } else if (item.selectorText.includes(":")) {
                if (!element.id) element.dataset.alder = this._generate();
                document.styleSheets[0].insertRule(`${element.id || element.nodeName.toLowerCase()}[data-alder="${element.dataset.alder}"] > ${item.cssText}`, 0);
            }
        });

        sheet.remove();

        return element;
    }

    _generate() {
        let i = Math.ceil(Math.random() * 99999);
        if (this.ids.length == 99999) { return false }
        else if (this.ids.includes(i)) { i = this._generate() }

        return i;
    }
}

export default Alder;