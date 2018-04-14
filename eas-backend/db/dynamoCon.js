let aws = require('aws-sdk')
aws.config.update({region: 'us-east-1'})

let dynamo = new aws.DynamoDB.DocumentClient();

module.exports = dynamo