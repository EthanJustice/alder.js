var Alder = /** @class */ (function () {
    function Alder(auto) {
        var _this = this;
        if (auto === void 0) { auto = true; }
        this.ids = [];
        if (auto === true) {
            document.body.querySelectorAll('* > style').forEach(function (element) {
                if (element.parentElement) {
                    _this.parse(element.parentElement);
                }
            });
        }
    }
    Alder.prototype.parse = function (element) {
        var _this = this;
        if (!element.querySelector('style'))
            return false;
        var rules = /:|@/;
        var sheet = element.querySelector('style');
        if (sheet && sheet.sheet) {
            Object.values(sheet.sheet.rules).forEach(function (item) {
                if (item instanceof CSSStyleRule) {
                    if (item.selectorText.match(rules) == null) {
                        element.querySelectorAll("" + item.selectorText).forEach(function (child) {
                            Object.values(item.style).forEach(function (prop) {
                                child.style[prop] = item.style[prop];
                            });
                        });
                    }
                    else if (item.selectorText.includes(':')) {
                        if (!element.id)
                            element.setAttribute('data-alder', _this._generate().toString());
                        document.styleSheets[0].insertRule((element.id || element.nodeName.toLowerCase()) + "[data-alder=\"" + element.dataset.alder + "\"] > " + item.cssText, 0);
                    }
                }
            });
            sheet.remove();
            return element;
        }
        else {
            return false;
        }
    };
    Alder.prototype._generate = function () {
        var i = Math.ceil(Math.random() * 99999);
        if (this.ids.includes(i)) {
            i = this._generate();
        }
        return i;
    };
    return Alder;
}());
export default Alder;
