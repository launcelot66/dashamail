/**
 *
 *
 * @class
 */
class CObject {
    /**
     * @param {object} item
     * @param {string} key
     * @param defaultValue
     * @returns {*|null}
     */
    static get(item, key, defaultValue = null) {
        if (!item || !key) return defaultValue;
        const keyArr = key instanceof Array ? key : key.toString().split('.');
        const itemKey = keyArr.shift();
        let result = item[ itemKey ];

        if (result === undefined || result === null) {
            if (item instanceof Array && isNaN(+itemKey)) {
                const resultArr = Array.from(item.keys())
                    .map(_key => {
                        keyArr.unshift(_key, itemKey);
                        return this.get(item, keyArr);
                    })
                    .filter(res => res !== null);
                return resultArr.length ? resultArr : defaultValue;
            }
            result = defaultValue;
        }
        return result && keyArr.length ? this.get(result, keyArr, defaultValue) : result;
    }
}

module.exports = CObject;
