const DashaMail = require('./dashaMail');
/**
 * Software Development Kit for DashaMail Lists
 * @class
 */
class Lists extends DashaMail {
    /**
     * Add a subscriber to the database
     * Добавляем подписчика в базу
     *
     * @param {number} list_id
     * @param {string} email
     * @param {string|null} gender m - male, f - female, n - none
     * @param {boolean} update
     * @param {boolean} no_check
     * @param {object|array|null} merges
     */
    add_member(
        list_id,
        email,
        gender = null,
        update = false,
        no_check = false,
        merges = null
    ) {
        this.setMethod('add_member');

        const body = new URLSearchParams();
        body.set('list_id', list_id.toString());
        body.set('email', email);

        if (gender) body.set('gender', gender);
        if (update) body.set('update', update.toString());
        if (no_check) body.set('no_check', no_check.toString());
        if (merges) {
            let keys = [];
            if (merges instanceof Object && Object.keys(merges).length > 0) {
                keys = Object.keys(Object.assign({}, merges));
            } else if (merges instanceof Array && merges.length > 0) {
                keys = merges.keys();
            }
            for (let key of keys) {
                if (key.indexOf('merge_') !== -1) {
                    body.set(key, merges[key]);
                }
            }
        }
        return this.request(body);
    }
}

Lists.prototype.name = 'lists';

module.exports = Lists;
