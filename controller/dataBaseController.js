const dotenv = require("dotenv");
dotenv.config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
    PutCommand,
    DeleteCommand,
    ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const docClient = new DynamoDBClient({ regions: process.env.AWS_REGION });

exports.getItems = async(req, res) => {
    const params = {
        TableName: process.env.aws_items_table_name,
    };
    try {
        const data = await docClient.send(new ScanCommand(params));
        res.send(data.Items);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

exports.addItem = async(req, res) => {
    //const created_date = Date.now();
    const item = { course_id: req.body.itemid + "." + req.body.uid, ...req.body };

    const params = {
        TableName: process.env.aws_items_table_name,
        Item: item,
        ConditionExpression: "attribute_not_exists(course_id)"
    };
    try {
        const data = await docClient.send(new PutCommand(params));
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

exports.deleteItem = async(req, res) => {
    const itemid = req.params.itemid;
    const deleteParams = {
        TableName: process.env.aws_items_table_name,
        Key: { course_id: itemid }
    }
    try {
        const response = await docClient.send(new DeleteCommand(deleteParams));
        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};