const SchemaType = require('./base/SchemaType');

/**
 * class that resolves numbers
 * @extends SchemaType
 * @since 0.5.0
 * @private
 */
class NumberType extends SchemaType {

	/**
	 * Resolves our data into a number
	 * @since 0.5.0
	 * @param {KlasaClient} client The KlasaClient
	 * @param {*} data The data to resolve
	 * @param {SchemaPiece} piece The piece this data should be resolving to
	 * @param {?external:Guild} guild The Guild instance that should be used for this piece
	 * @returns {*} The resolved data
	 */
	async resolve(client, data, piece, guild) {
		return this.checkNumber(client, data, piece, guild);
	}

	/**
	 * Checks what type of numbe we should resolve into
	 * @since 0.5.0
	 * @param {KlasaClient} client The KlasaClient
	 * @param {*} data The data to resolve
	 * @param {SchemaPiece} piece The piece this data should be resolving to
	 * @param {?external:Guild} guild The Guild instance that should be used for this piece
	 * @returns {*} The resolved data
	 */
	checkNumber(client, data, piece, guild) {
		const type = piece.type.toLowerCase();
		let numb;
		switch (type) {
			case 'number':
				numb = Number(data);
				if (!isNaN(numb)) return numb;
				throw (guild ? guild.language : client.languages.default).get('RESOLVER_INVALID_FLOAT', piece.key);
			case 'integer':
				numb = parseInt(data);
				if (Number.isInteger(numb)) return numb;
				throw (guild ? guild.language : client.languages.default).get('RESOLVER_INVALID_INT', piece.key);
			case 'float':
				numb = parseFloat(data);
				if (!isNaN(numb)) return numb;
				throw (guild ? guild.language : client.languages.default).get('RESOLVER_INVALID_FLOAT', piece.key);
		}
		// noop
		return null;
	}

}

module.exports = NumberType;