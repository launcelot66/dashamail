/**
 * Enum for transactional get_log event_type.
 * @readonly
 * @enum {string}
 */
const EventType = {
    all: 'all',
    sent: 'sent',
    opened: 'opened',
    clicked: 'clicked',
    bounced: 'bounced',
    unsubscribed: 'unsubscribed',
    complained: 'complained',
}

module.exports = EventType;
