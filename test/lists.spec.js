const DashaMailLists = require('../classes/lists');
const config = require('config');

describe('DashaMail.lists', () => {
    it('add_member', async () => {
        await new DashaMailLists()
            .setApiKey(config.get('apiKey'))
            .add_member(config.get('apiKey'), config.get('to'))
            .then()
            .catch()
    });
});
