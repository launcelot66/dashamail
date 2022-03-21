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
     * @param {string|null} gender
     * @param {string|null} update
     * @param {string|null} no_check
     * @param {string|null} merge_1
     * @param {string|null} merge_2
     * @param {string|null} merge_3
     * @param {string|null} merge_4
     * @param {string|null} merge_5
     * @param {string|null} merge_6
     * @param {string|null} merge_7
     * @param {string|null} merge_8
     * @param {string|null} merge_9
     * @param {string|null} merge_10
     */
    add_member(
        list_id,
        email,
        gender = null,
        update = null,
        no_check = null,
        merge_1 = null,
        merge_2 = null,
        merge_3 = null,
        merge_4 = null,
        merge_5 = null,
        merge_6 = null,
        merge_7 = null,
        merge_8 = null,
        merge_9 = null,
        merge_10 = null
    ) {
        this.setMethod('add_member');

        const body = new URLSearchParams();
        body.set('list_id', list_id.toString());
        body.set('email', email);

        if (gender) body.set('gender', gender);
        if (update) body.set('update', update);
        if (no_check) body.set('no_check', no_check);
        if (merge_1) body.set('merge_1', merge_1);
        if (merge_2) body.set('merge_2', merge_2);
        if (merge_3) body.set('merge_3', merge_3);
        if (merge_4) body.set('merge_4', merge_4);
        if (merge_5) body.set('merge_5', merge_5);
        if (merge_6) body.set('merge_6', merge_6);
        if (merge_7) body.set('merge_7', merge_7);
        if (merge_8) body.set('merge_8', merge_8);
        if (merge_9) body.set('merge_9', merge_9);
        if (merge_10) body.set('merge_10', merge_10);

        return this.request(body);
    }
}

Lists.prototype.name = 'lists';

module.exports = Lists;
