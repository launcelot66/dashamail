const DashaMailAccount = require('../../classes/account');
const config = require('config');

describe('DashaMail.account', () => {
    it('get_balance', async () => {
        await new DashaMailAccount()
            .setApiKey(config.get('apiKey'))
            .get_balance()
            .then()
            .catch()
    });
});
