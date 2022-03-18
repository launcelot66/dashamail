const DashaMail = require('classes/dashaMail');
/**
 * Software Development Kit for DashaMail Account
 * @class
 */
class Account extends DashaMail {
    /**
     * @returns {Promise<*>}
     */
    get_balance() {
        this.setMethod('get_balance');
        return this.request(new URLSearchParams());
    }
}

Account.prototype.name = 'account';

module.exports = Account;
