const DashaMailTransactional = require('../../classes/transactional');
const config = require('config');

describe('DashaMail.transactional', () => {
    describe('send', () => {

        it('to set', () => {
            const transactional = new DashaMailTransactional()
                .setTo(config.get('to'), config.get('toName'));
            expect(config.get('to')).toEqual(transactional.getTo());
        });

        it('From with email', () => {
            const email = config.get('from');
            const transactional = new DashaMailTransactional().setFrom(email);
            expect(email).toEqual(transactional.getFrom());
        });

        it('From with email and name', () => {
            const email = config.get('from');
            const name = config.get('fromName');
            const transactional = new DashaMailTransactional().setFrom(email, name);
            expect(`"${name}" <${email}>`).toEqual(transactional.getFrom());
        });

        it('Reply-To with email', () => {
            const email = config.get('replyTo');
            const transactional = new DashaMailTransactional().setReplyTo(email);
            expect(email).toEqual(transactional.getReplyTo());
        });

        it('Reply-To with email and name', () => {
            const email = config.get('replyTo');
            const name = config.get('replyToName');
            const transactional = new DashaMailTransactional().setReplyTo(email, name);
            expect(`"${name}" <${email}>`).toEqual(transactional.getReplyTo());
        });

        it('subject', () => {
            const subject = config.get('subject');
            const transactional = new DashaMailTransactional().setSubject(subject);
            expect(subject).toEqual(transactional.getSubject());
        });

        it('header', () => {
            const transactional = new DashaMailTransactional().setHeader('a', 2);
            expect({a: 2}).toEqual(transactional.getHeaders());
        });

        it('message', () => {
            const message = config.get('message');
            const transactional = new DashaMailTransactional().setMessage(message);
            expect(message).toEqual(transactional.getMessage());
        });

        it('replace', () => {
            const replaces = config.get('replace');
            const transactional = new DashaMailTransactional().setReplaces(replaces);
            expect(replaces).toEqual(transactional.getReplaces());
        });

        it('domain', () => {
            const domain = config.get('domain');
            const transactional = new DashaMailTransactional().setDomain(domain);
            expect(domain).toEqual(transactional.getDomain());
        });

        it('campaignId', () => {
            const campaignId = config.get('campaignId');
            const transactional = new DashaMailTransactional().setCampaignId(campaignId);
            expect(campaignId).toEqual(transactional.getCampaignId());
        });

        it('delivery_time', () => {
            const delivery_time = +new Date() + (1000 * 60 * 5); // 5 min
            const transactional = new DashaMailTransactional().setDeliveryTime(delivery_time);
            expect(delivery_time).toEqual(transactional.getDeliveryTime());
        });

        it('no_track_opens', () => {
            const no_track_opens = true;
            const transactional = new DashaMailTransactional().setNoTrackOpens(no_track_opens);
            expect(no_track_opens).toEqual(transactional.getNoTrackOpens());
        });

        it('no_track_clicks', () => {
            const no_track_clicks = true;
            const transactional = new DashaMailTransactional().setNoTrackClicks(no_track_clicks);
            expect(no_track_clicks).toEqual(transactional.getNoTrackClicks());
        });

        it('plain_text', () => {
            const plain_text = config.get('plain_text');
            const transactional = new DashaMailTransactional().setPlainText(plain_text);
            expect(plain_text).toEqual(transactional.getPlainText());
        });

        it('should return error "to not set"', async () => {
            await new DashaMailTransactional()
                .send()
                .catch(error => expect('to not set').toEqual(error));
        });

        it('error "message not set"', async () => {
            await new DashaMailTransactional()
                .setTo(config.get('to'), config.get('toName'))
                .send()
                .catch(error => expect('message not set').toEqual(error));
        });

        it('error "headers not set"', async () => {
            await new DashaMailTransactional()
                .setTo(config.get('to'))
                .setMessage(config.get('message'))
                .send()
                .catch(error => expect(error).toEqual('headers not set'));
        });

        it('error "headers.Subject not set"', async () => {
            await new DashaMailTransactional()
                .setTo(config.get('to'))
                .setMessage(config.get('message'))
                .setHeader("test", "test")
                .send()
                .catch(error => expect('headers.Subject not set').toEqual(error));
        });

        it('should return error "headers.From not set"', async () => {
            await new DashaMailTransactional()
                .setTo(config.get('to'), config.get('toName'))
                .setMessage(config.get('message'))
                .setSubject(config.get('subject'))
                .send()
                .catch(error => expect('headers.From not set').toEqual(error));
        });

        it('should return error "apiKey not set"', async () => {
            await new DashaMailTransactional()
                .setTo(config.get('to'), config.get('toName'))
                .setFrom(config.get('from'), config.get('fromName'))
                .setMessage(config.get('message'))
                .setSubject(config.get('subject'))
                .send()
                .catch(error => expect('apiKey not set').toEqual(error));
        });
    });

    describe('check', () => {
        it('should return error "apiKey not set"', async () => {
            await new DashaMailTransactional()
                .check('test')
                .catch(error => expect(error).toEqual('apiKey not set'));
        });
    });

    describe('get_log', () => {
        it('should return error "apiKey not set"', () => {
            new DashaMailTransactional()
                .get_log()
                .catch(error => expect(error).toEqual('apiKey not set'));
        });
    });
});
