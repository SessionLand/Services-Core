/**
 * @author SessionLand
 * @namespace Security_Database
 * @description Initialize
 */

import * as AWS from "aws-sdk";
import { TableManager } from "../../common/database/table-manager";
import { SecurityTableName } from "./entity";

export const initializeSecurityTable = async (): Promise<AWS.DynamoDB.CreateTableOutput> => {

    const tableManager: TableManager = TableManager.instance;

    const params: AWS.DynamoDB.CreateTableInput = {

        TableName: SecurityTableName,
        BillingMode: 'PAY_PER_REQUEST',
        KeySchema: [
            {
                AttributeName: "category",
                KeyType: "HASH", // Partition key
            },
        ],
        AttributeDefinitions: [
            {
                AttributeName: "category",
                AttributeType: "S", // String
            },
        ],
    };

    const output: AWS.DynamoDB.CreateTableOutput = await tableManager.createTable(params);

    return output;
};

export const deleteSecurityTable = async (): Promise<AWS.DynamoDB.CreateTableOutput> => {

    const tableManager: TableManager = TableManager.instance;

    const params: AWS.DynamoDB.DeleteTableInput = {

        TableName: SecurityTableName,
    };

    const output: AWS.DynamoDB.DeleteTableOutput = await tableManager.deleteTable(params);

    return output;
};
