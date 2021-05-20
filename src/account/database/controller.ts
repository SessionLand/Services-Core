/**
 * @author SessionLand
 * @namespace Account_Database
 * @description Controller
 */

import { DocumentManager } from "../../common/database/document-manager";
import { ERROR_CODE, panic } from "../../common/error/panic";
import { AccountEntity, AccountTableName } from "./entity";

export const retrieveAccountEntity = async (email: string, token: string): Promise<AccountEntity> => {

    const documentManager: DocumentManager = DocumentManager.instance;

    const getParams: AWS.DynamoDB.DocumentClient.GetItemInput = {

        TableName: AccountTableName,
        Key: {
            email,
        },
    };

    const getOutput: AWS.DynamoDB.DocumentClient.GetItemOutput = await documentManager.getItem(getParams);

    if (!getOutput.Item) {
        throw panic.code(ERROR_CODE.RETRIEVE_ACCOUNT_UNDEFINED);
    }

    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {

        TableName: AccountTableName,
        Item: {},
    };

    await documentManager.putData(params);

    return null as any;
};