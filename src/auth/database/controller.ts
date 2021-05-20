/**
 * @author SessionLand
 * @namespace Auth_Database
 * @description Controller
 */

import { DocumentManager } from "../../common/database/document-manager";
import { ERROR_CODE, panic } from "../../common/error/panic";
import { AuthEntity, AuthTableName } from "./entity";

export const retrieveAuthEntity = async (email: string, token: string): Promise<AuthEntity> => {

    const documentManager: DocumentManager = DocumentManager.instance;

    const getParams: AWS.DynamoDB.DocumentClient.GetItemInput = {

        TableName: AuthTableName,
        Key: {
            email,
        },
    };

    const getOutput: AWS.DynamoDB.DocumentClient.GetItemOutput = await documentManager.getItem(getParams);

    if (!getOutput.Item) {
        throw panic.code(ERROR_CODE.RETRIEVE_ACCOUNT_UNDEFINED);
    }

    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {

        TableName: AuthTableName,
        Item: {},
    };

    await documentManager.putData(params);

    return null as any;
};