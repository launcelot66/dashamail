const Format = require('./format');
const axios = require("axios").default;
const CObject = require("./CObject");
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


    /**
     * @protected
     * @param {URLSearchParams} body
     * @returns {Promise<unknown>}
     */
    request(body) {
        return new Promise((resolve, reject) => {
            if (!this.apiKey) return reject('apiKey not set');
            body.set('api_key', this.getApiKey());
            body.set('method', this.getMethod());
            body.set('format', this.format);
            const headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};
            axios
                .post(this.host, body, {headers})
                .then(response => {
                    if (response.status === 200) {
                        const status = CObject.get(response.data, 'response.msg.text');
                        if (status && status !== 'OK') return reject(status);
                        else return resolve(response.data);
                    }
                    return reject(response.data);
                }, error => {
                    return reject(error);
                });
        });
    }
}

module.exports = DashaMail;
