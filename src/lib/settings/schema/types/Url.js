const SchemaType = require('./base/SchemaType');
const URL = require('url');

/**
 * class that resolves urls
 * @extends SchemaType
 * @since 0.5.0
 * @private
 */
class UrlType extends SchemaType {

	/**
	 * Resolves our data into an URL
	 * @since 0.5.0
	 * @param {KlasaClient} client The KlasaClient
	 * @param {*} data The data to resolve
	 * @param {SchemaPiece} piece The piece this data should be resolving to
	 * @param {?external:Guild} guild The Guild instance that should be used for this piece
	 * @returns {*} The resolved data
	 */
	async resolve(client, data, piece, guild) {
		const url = URL.parse(data);
		if (url.protocol && url.hostname) return data;
		throw (guild ? guild.language : client.languages.default).get('RESOLVER_INVALID_URL', piece.key);
	}

}

module.exports = UrlType;