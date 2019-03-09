const AWS = require('aws-sdk');
const moment = require('moment');

const cognito = new AWS.CognitoIdentityServiceProvider();
const { USER_POOL_ID: userPoolId } = process.env;

module.exports.graphqlHandler = async (event, context) => {
  switch (event.field) {
    case 'me':
    case 'createdBy': {
      const { username } = event;
      const {
        UserCreateDate: createdAt
      } = await cognito.adminGetUser({ UserPoolId: userPoolId, Username: username }).promise();
      return {
        username,
        createdAt: moment(createdAt).format()
      };
    }
    default: {
      throw new Error(`Unknown field, unable to resolve ${event.field}`);
    }
  }
  callback(null, response);
};
