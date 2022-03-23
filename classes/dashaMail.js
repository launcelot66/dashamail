const Format = require('./format');
const https = require('https');
const CObject = require("./CObject");
/**
 * Software Development Kit for DashaMail
 * @class
 */
class DashaMail {
    /**
     * Update/Set apiKey
     * @public
     * @param {string} apiKey
     * @returns {this}
     */
    setApiKey(apiKey) {
        if (apiKey) this.apiKey = apiKey;
        return this;
    }

    /**
     * @public
     * @returns {string|null}
     */
    getApiKey() {
        return CObject.get(this, 'apiKey');
    }

    /**
     * Update DashaMail host
     * @public
     * @param {string} host
     * @returns {this}
     */
    setHost(host) {
        if (host && typeof host === 'string') this.host = host;
        return this;
    }

    /**
     * @public
     * @returns {string|*}
     */
    getHost() {
        return CObject.get(this, 'host', 'api.dashamail.com');
    }

    /**
     * @param {Format} format
     * @returns {DashaMail}
     */
    setFormat(format) {
        if (format && Object.keys(Format).indexOf(format) !== -1) this.format = format;
        return this;
    }

    /**
     * @returns {Format}
     */
    getFormat() {
        return CObject.get(this, 'format', Format.json);
    }

    /**
     * Update DashaMail method
     * @protected
     * @param {string} method
     * @returns {this}
     */
    setMethod(method) {
        if (method) this.method = `${this.name}.${method}`;
        return this;
    }

    /**
     * @public
     * @returns {string|null}
     */
    getMethod() {
        return CObject.get(this, 'method');
    }

    /**
     * Update request timeout
     *
     * @param timeout
     * @returns {DashaMail}
     */
    setTimeout(timeout) {
        if (timeout >= 0) this.timeout = timeout;
        return this;
    }

    /**
     * @returns {number}
     */
    getTimeout() {
        return CObject.get(this, 'timeout', 5000);
    }

    /**
     * For ignoring unsubscribe from emails
     *
     * @param ignore
     * @returns {this}
     */
    setIgnoreUnsubscribe(ignore) {
        this.ignoreUnsubscribe = ignore;

        return this;
    }

    /**
     *
     * @returns {boolean}
     */
    getIgnoreUnsubscribe() {
        return CObject.get(this, 'ignoreUnsubscribe', false)
    }


    /**
     * @protected
     * @param {URLSearchParams} body
     * @returns {Promise<unknown>}
     */
    request(body) {
        return new Promise((resolve, reject) => {
            if (!this.apiKey) return reject('apiKey not set');
            if (!this.getMethod()) return reject('method not set');
            body.set('api_key', this.getApiKey());
            body.set('method', this.getMethod());
            body.set('format', this.getFormat());

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Content-Length': Buffer.byteLength(body.toString())
            };
            if (this.getIgnoreUnsubscribe()) Object.assign(headers, {'X-Dashamail-Unsub-Ignore': true});

            const options = {host: this.getHost(), method: 'POST', timeout: this.getTimeout(), headers}

            const request = https.request(options, res => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end',  () => {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {
                        if (this.getFormat() !== 'xml') return reject(e);
                    }
                    if (res.statusCode === 200) {
                        const status = CObject.get(body, 'response.msg.text');
                        if (status && status !== 'OK') return reject(status);
                        else return resolve(body);
                    }
                    return reject(body);
                });
            })
            request.write(body.toString());
            request.end();
            request.on('error', e => reject(e));
        });
    }
}

DashaMail.prototype.name = 'dashamail';

module.exports = DashaMail;
