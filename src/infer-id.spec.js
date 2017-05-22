"use strict";

const inferId = require('./infer-id');

function test(name, expectedId) {
    it(`: ${name}`, function () {
        let id = inferId(name);
        expect(id).toEqual(expectedId);
    });
}

describe('Infer id', function () {

    describe("infers the id of an artist name", function () {

        test('Lady Gaga', 'lady-gaga');
        test('Lady GaGa', 'lady-gaga');
        test('"Katy Lou" Wurlitzer 153 band Organ', 'katy-lou-wurlitzer-153-band-organ');
        test('"No Man Is An Island"', 'no-man-is-an-island');
        test('Candlebox', 'candlebox');
        test('Ladyhawke', 'lady-hawke');

        test('"Elsie"', 'elsie');
        test('"Elsie"', 'elsie');
        test('The Moth & The Flame', 'the-moth-the-flame');
        test('!!! Chk Chik Chick', 'chk-chik-chick');
        test('#1 Dads', '1-dads');
        test('\'Sister\' Carol East', 'sister-carol-east');
        test('( folk song )', 'folk-song');
        test('Can\'t Stay Away', 'cant-stay-away');
        test('Candice Accola (Caroline)', 'candice-accola-caroline');

        test('Björk', 'bjork');
        test('Ke$ha', 'kesha');
        test('A$AP Ferg', 'aap-ferg');

    });
});