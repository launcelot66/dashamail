const Format = require('./format');
/**
 * Software Development Kit for DashaMail
 * @class
 */
class DashaMail {
    /**
     * DashaMail's API host
     * @protected
     * @type {string}
     */
    host = 'https://api.dashamail.com';
    /**
     * DashaMail's API apiKey
     * @protected
     * @type {string|null}
     */
    apiKey = null;
    /**
     * DashaMail's response format: json|jsonb|xml
     * @protected
     * @enum {Format}
     */
    format = Format.json;
    /**
     * DashaMail's method
     * @protected
     * @type {string|null}
     */
    method = null;

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
        return this.apiKey;
    }

    /**
     * Update DashaMail host
     * @public
     * @param {string} host
     * @returns {this}
     */
    setHost(host) {
        if (host) this.host = host;
        return this;
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
        return this.method;
    }
}

module.exports = DashaMail;
