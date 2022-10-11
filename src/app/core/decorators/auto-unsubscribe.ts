export function AutoUnsubscribe(whiteList: any[] = []) {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      for (let prop in this) {
        const property = this[prop];
        if (!whiteList.includes(prop)) {
          if (property && (typeof property.unsubscribe === "function")) {
            property.unsubscribe();
          }
        }
      }
      original && typeof original === 'function' && original.apply(this, arguments);
    };
  }
}
