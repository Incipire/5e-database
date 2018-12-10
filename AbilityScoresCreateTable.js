var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Spells",
    KeySchema: [       
        { AttributeName: "source", KeyType: "HASH"},  //Partition key
        { AttributeName: "type", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "source", AttributeType: "S" },
        { AttributeName: "type", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
