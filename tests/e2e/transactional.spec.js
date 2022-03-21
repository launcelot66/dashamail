const DashaMailTransactional = require('../../classes/transactional');
const config = require('config');
/** @type {string} */
let successTransactionId;

describe('DashaMail.transactional', () => {
    it('send', async () => {
        await new DashaMailTransactional()
            .setApiKey(config.get('apiKey'))
            .setTo(config.get('to'), config.get('toName'))
            .setFrom(config.get('from'), config.get('fromName'))
            .setReplyTo(config.get('replyTo'), config.get('replyToName'))
            .setMessage(config.get('message'))
            .setSubject(config.get('subject'))
            .setReplaces(config.get('replace'))
            .send()
            .then(transactionalId => {
                successTransactionId = transactionalId;
                expect(transactionalId).toMatch(/^[a-z0-9]+$/)
            });
    });

    it('check', async () => {
        await new DashaMailTransactional()
            .setApiKey(config.get('apiKey'))
            .check(successTransactionId)
            .then()
            .catch(error => expect(error).toEqual('Отчет недоступен'));
    }, 1000 * 60 * 5); // 5 minutes to timeout

    it('get_log', async () => {
        await new DashaMailTransactional()
            .setApiKey(config.get('apiKey'))
            .get_log()
            .then(items => expect(items.length).toBeGreaterThan(0));
    });
});
