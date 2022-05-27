const DashaMailLists = require('../../classes/lists');
const config = require('config');

describe('DashaMail.lists', () => {
    it('add_member', async () => {
        const response = await new DashaMailLists()
            .setApiKey(config.get('apiKey'))
            .add_member(
                config.get('list_id'),
                config.get('to'),
                'n',
                true,
                false,
                config.get('merges')
            )
            .then()
            .catch()
        expect(parseInt(response.response.data.member_id)).toBeGreaterThan(0);
    });
});
