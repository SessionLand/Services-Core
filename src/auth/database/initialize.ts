/**
 * @author SessionLand
 * @namespace Auth_Database
 * @description Initialize
 */

import * as AWS from "aws-sdk";
import { TableManager } from "../../common/database/table-manager";
import { AuthTableName } from "./entity";

export const initializeAuthTable = async (): Promise<AWS.DynamoDB.CreateTableOutput> => {

    const tableManager: TableManager = TableManager.instance;

    const params: AWS.DynamoDB.CreateTableInput = {

        TableName: AuthTableName,
        BillingMode: 'PAY_PER_REQUEST',
        KeySchema: [
            {
                AttributeName: "email",
                KeyType: "HASH", // Partition key
            },
        ],
        AttributeDefinitions: [
            {
                AttributeName: "email",
                AttributeType: "S", // String
            },
        ],
    };

    const output: AWS.DynamoDB.CreateTableOutput = await tableManager.createTable(params);

    return output;
};

export const deleteAuthTable = async (): Promise<AWS.DynamoDB.CreateTableOutput> => {

    const tableManager: TableManager = TableManager.instance;

    const params: AWS.DynamoDB.DeleteTableInput = {

        TableName: AuthTableName,
    };

    const output: AWS.DynamoDB.DeleteTableOutput = await tableManager.deleteTable(params);

    return output;
};
