const DashaMail = require('../../classes/dashaMail');
const config = require('config');
const Format = require("../../classes/format");

describe('DashaMail', () => {

    it('default apiKey', () => {
        expect(null).toEqual(new DashaMail().getApiKey());
    });

    it('update apiKey', () => {
        expect(config.get('apiKey')).toEqual(new DashaMail().setApiKey(config.get('apiKey')).getApiKey());
    });

    it('default host', () => {
        expect('https://api.dashamail.com').toEqual(new DashaMail().getHost());
    });

    it('update host', () => {
        expect('https://api2.dashamail.com').toEqual(new DashaMail().setHost('https://api2.dashamail.com').getHost());
    });

    it('default format', () => {
        expect(Format.json).toEqual(new DashaMail().getFormat());
    });

    it('update format', () => {
        expect(Format.xml).toEqual(new DashaMail().setFormat(Format.xml).getFormat());
    });

    it('default method', () => {
        expect(null).toEqual(new DashaMail().getMethod());
    });

    it('update method', () => {
        expect('dashamail.test').toEqual(new DashaMail().setMethod('test').getMethod());
    });

    it('default timeout', () => {
        expect(5000).toEqual(new DashaMail().getTimeout());
    });

    it('update timeout', () => {
        expect(2500).toEqual(new DashaMail().setTimeout(2500).getTimeout());
    });

    it('default ignore unsubscribe', () => {
        expect(false).toEqual(new DashaMail().getIgnoreUnsubscribe());
    });

    it('update ignore unsubscribe', () => {
        expect(true).toEqual(new DashaMail().setIgnoreUnsubscribe(true).getIgnoreUnsubscribe());
    });
});
