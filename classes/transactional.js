const DashaMail = require('./dashaMail');
const CObject = require('./CObject');
const EventType = require('./eventType');
const Sort = require('./sort');
const isValidDate = require('./isValidDate');

/**
 * Software Development Kit for DashaMail Transactional
 * @class
 * @property {{[key: string]: string}} headers for send method
 * @property {string} to email for send method
 * @property {number} message MessageId from DashaMail
 */
class Transactional extends DashaMail {
    constructor() {
        super();
        this.headers = {}
    }

    /**
     * For send method
     *
     * @param {string} email
     * @param {string|null} name
     * @returns {this}
     */
    setTo(email, name = null) {
        this.to = email;
        if (name) this.setHeader('To', `"${name}" <${email}>`);

        return this;
    }

    /**
     * @returns {string|null}
     */
    getTo() {
        return this.to || null;
    }

    /**
     * For send method
     *
     * @param {string} email
     * @param {string|null} name
     * @returns {this}
     */
    setFrom(email, name = null) {
        if (!email) return this;
        this.setHeader('From', name ? `"${name}" <${email}>` : email);
        return this;
    }

    /**
     * @returns {string|null}
     */
    getFrom() {
        return CObject.get(this.getHeaders(), 'From');
    }

    /**
     * For send method
     *
     * @param {string} email
     * @param {string|null} name
     * @returns {this}
     */
    setReplyTo(email, name = null) {
        if (!email) return this;
        this.setHeader('Reply-To', name ? `"${name}" <${email}>` : email);
        return this;
    }

    /**
     * @returns {string|null}
     */
    getReplyTo() {
        return CObject.get(this.getHeaders(), 'Reply-To');
    }

    /**
     * For send method
     *
     * @param {string} subject
     * @returns {this}
     */
    setSubject(subject) {
        if (!subject) return this;
        this.setHeader('Subject', subject);
        return this;
    }

    /**
     * @returns {string|null}
     */
    getSubject() {
        return CObject.get(this.getHeaders(), 'Subject');
    }

    /**
     * For send method
     *
     * @param {string} key
     * @param {string|number} value
     * @returns {this}
     */
    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    /**
     * @returns {{[p: string]: string|number}}
     */
    getHeaders() {
        return CObject.get(this, 'headers', {});
    }

    /**
     * For send method
     *
     * @param {number} messageId
     * @returns {this}
     */
    setMessage(messageId) {
        if (messageId > 0) this.message = messageId;
        return this;
    }

    /**
     * @returns {number|null}
     */
    getMessage() {
        return CObject.get(this, 'message');
    }

    /**
     * For send method
     *
     * @param {{[key: string]: *}} replaces
     * @returns {this}
     */
    setReplaces(replaces) {
        if (!replaces || !(replaces instanceof Object) || !Object.keys(replaces).length) return this;
        if (!CObject.get(this, 'replace')) this.replace = {};
        Object.keys(replaces).forEach(key => this.replace[key] = CObject.get(replaces, key));
        return this;
    }

    /**
     * @returns {{[key: string]: *}|null}
     */
    getReplaces(){
        return CObject.get(this, 'replace')
    }

    /**
     * For send method
     *
     * @param {string} domain
     * @returns {this}
     */
    setDomain(domain) {
        if (!domain) return this;
        this.domain = domain;
        return this;
    }

    /**
     * @returns {string|null}
     */
    getDomain() {
        return CObject.get(this, 'domain');
    }

    /**
     * For send method
     *
     * @param {number} campaign_id
     * @returns {this}
     */
    setCampaignId(campaign_id) {
        if (!campaign_id) return this;
        this.campaign_id = campaign_id;
        return this;
    }

    /**
     * @returns {number|null}
     */
    getCampaignId() {
        return CObject.get(this, 'campaign_id');
    }

    /**
     * For send method
     *
     * @param {number} timestamp
     * @returns {this}
     */
    setDeliveryTime(timestamp) {
        if (!timestamp || (timestamp < +new Date())) return this;
        this.delivery_time = timestamp;
        return this;
    }

    /**
     * @returns {number|null}
     */
    getDeliveryTime() {
        return CObject.get(this, 'delivery_time')
    }

    /**
     * For send method
     *
     * @param {boolean} no_track_opens
     * @returns {this}
     */
    setNoTrackOpens(no_track_opens) {
        if (!no_track_opens) return this;
        this.no_track_opens = no_track_opens;
        return this;
    }

    /**
     * @returns {boolean}
     */
    getNoTrackOpens() {
        return CObject.get(this, 'no_track_opens', false);
    }

    /**
     * For send method
     *
     * @param {boolean} no_track_clicks
     * @returns {this}
     */
    setNoTrackClicks(no_track_clicks) {
        if (!no_track_clicks) return this;
        this.no_track_clicks = no_track_clicks;
        return this;
    }

    /**
     * @returns {boolean}
     */
    getNoTrackClicks() {
        return CObject.get(this, 'no_track_clicks', false);
    }

    /**
     * For send method
     *
     * @param {string} plain_text
     * @returns {this}
     */
    setPlainText(plain_text) {
        if (!plain_text) return this;
        this.plain_text = plain_text;
        return this;
    }

    /**
     * @returns {string|null}
     */
    getPlainText() {
        return CObject.get(this, 'plain_text');
    }

    /**
     * @param {EventType} event_type
     * @returns {this}
     */
    setLogEventType(event_type) {
        if (!event_type || Object.keys(EventType).indexOf(event_type) === -1) return this;
        this.event_type = event_type;
        return this;
    }

    /**
     * @returns {EventType|null}
     */
    getLogEventType() {
        return CObject.get(this, 'event_type', EventType.all);
    }

    /**
     * @param {Sort} sort
     * @returns {this}
     */
    setLogSort(sort) {
        if (sort === Sort.asc || sort === Sort.desc) this.sort = sort;
        return this;
    }

    /**
     * @returns {Sort}
     */
    getLogSort() {
        return CObject.get(this, 'sort', Sort.desc);
    }

    /**
     * @param {string} from format: yyyy-mm-dd hh:mm:ss
     * @returns {Transactional}
     */
    setLogFrom(from) {
        if (from && isValidDate(from)) this.logFrom = from;
        return this;
    }

    /**
     * @returns {string|null}
     */
    getLogFrom(){
        return CObject.get(this, 'logFrom');
    }

    /**
     * @param {string} to format: yyyy-mm-dd hh:mm:ss
     * @returns {Transactional}
     */
    setLogTo(to) {
        if (from && isValidDate(from)) this.logTo = from;
        return this;
    }

    /**
     * @returns {string|null}
     */
    getLogTo(){
        return CObject.get(this, 'logTo');
    }

    /**
     * Sending transactional email
     * @public
     * @returns {Promise<string>} transaction_id or error message
     */
    send() {
        return new Promise((resolve, reject) => {
            if (!this.getTo()) return reject('to not set');
            if (!this.getMessage()) return reject('message not set');

            const headers = this.getHeaders();
            if (!Object.keys(headers).length) return reject('headers not set');
            if (!CObject.get(headers, 'Subject')) return reject('headers.Subject not set');
            if (!CObject.get(headers, 'From')) return reject('headers.From not set');

            this.setMethod('send');
            const body = new URLSearchParams();
            body.set('to', this.getTo());
            body.set('message', this.getMessage());
            body.set('headers', JSON.stringify(headers));

            if (this.getReplaces()) body.set('replace', JSON.stringify(this.getReplaces()));
            if (this.getDomain()) body.set('domain', this.getDomain());
            if (this.getCampaignId()) body.set('campaign_id', this.getCampaignId());
            if (this.getDeliveryTime()) body.set('delivery_time', this.getDeliveryTime());
            if (this.getNoTrackOpens()) body.set('no_track_opens', this.getNoTrackOpens().toString());
            if (this.getNoTrackClicks()) body.set('no_track_clicks', this.getNoTrackClicks().toString());
            if (this.getPlainText()) body.set('plain_text', this.getPlainText());

            this.request(body).then(
                data => resolve(CObject.get(data, 'response.data.transaction_id')),
                error => reject(error)
            );
        });
    }

    /**
     * Checking the status of send email
     * @param {string} transaction_id received after the send method
     * @returns {Promise<*>}
     */
    check(transaction_id) {
        if (!transaction_id) return new Promise((resolve, reject) => reject('transaction_id not set'));

        this.setMethod('check');

        const body = new URLSearchParams();
        body.set('transaction_id', transaction_id);

        return this.request(body);
    }

    /**
     * Getting emails events log
     *
     * @param {number|null} start what position to start from
     * @param {number|null} limit how much to output
     * @returns {Promise<unknown>|Promise<*>}
     */
    get_log(start = null, limit= null) {
        this.setMethod('get_log');

        const body = new URLSearchParams();
        body.set('event_type', this.getLogEventType());
        body.set('sort', this.getLogSort());
        if (this.getLogFrom()) body.set('from', this.getLogFrom());
        if (this.getLogTo()) body.set('to', this.getLogTo());
        if (start >= 0) body.set('start', start + '');
        if (limit > 0) body.set('limit', limit + '');

        return this.request(body);
    }
}

Transactional.prototype.name = 'transactional';

module.exports = Transactional;
