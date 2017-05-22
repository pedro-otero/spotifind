"use strict";

const S = require('string');

const replace = s => replacements => {
    for (var illegalChar in replacements) s = s.replace(illegalChar, replacements[illegalChar]);
    return s;
}

module.exports = name => {
    var illegalChars = ['&', '"', '!', '#', '\'', ')', '(', '*'];
    return replace(S(name).latinise().s)({'$': 's'})
        .toLowerCase()
        .split(' ')
        .filter(word => illegalChars.indexOf(word) === -1)
        .map(word => {
            var result = word;
            illegalChars.forEach(char => result = result.split(char).join(''));
            return result;
        })
        .filter(word => word.length > 0)
        .join('-');
}