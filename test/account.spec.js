const DashaMailAccount = require('../classes/account');
const config = require('config');

describe('DashaMail.lists', () => {
    it('add_member', async () => {
        await new DashaMailAccount()
            .setApiKey(config.get('apiKey'))
            .get_balance()
            .then()
            .catch()
    });
});
