const { v4: uuidv4 } = require('uuid');

exports.createUUID = () => {
    const tokens = uuidv4().split('-');
    return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};