"use strict";
class Alder {
    constructor(options = { auto: true }) {
        if (options.auto) {
            document
                .querySelectorAll("* > div")
                .forEach(element => this.parse(element));
            document.body
                .querySelectorAll("* > style")
                .forEach(element => this.parse(element.parentElement));
        }
    }

    parse(element) {
        if (!element) return;

        if (!element.querySelector("style")) {
            return element;
        }

        let sheet = element.querySelector("style");
        Object.values(sheet.sheet.rules).forEach(item => {
            if (
                !item.selectorText.includes("@") &&
                !item.selectorText.includes(":")
            ) {
                element
                    .querySelectorAll(`${item.selectorText}`)
                    .forEach(child => {
                        Object.values(item.style).forEach(prop => {
                            child.style[prop] = item.style[prop];
                        });
                    });
            } else if (item.selectorText.includes(":")) {
                document.styleSheets[0].insertRule(item.cssText, 0);
            }
        });

        sheet.remove();
    }
}
