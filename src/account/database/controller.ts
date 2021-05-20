/**
 * @author SessionLand
 * @namespace Account_Database
 * @description Controller
 */

import { DocumentManager } from "../../common/database/document-manager";
import { ERROR_CODE, panic } from "../../common/error/panic";
import { AccountEntity, AccountTableName } from "./entity";

export const retrieveAccountEntity = async (email: string, verifyString: string): Promise<AccountEntity> => {

    const documentManager: DocumentManager = DocumentManager.instance;

    const getParams: AWS.DynamoDB.DocumentClient.GetItemInput = {

        TableName: AccountTableName,
        Key: {
            email,
        },
    };

    const output: AWS.DynamoDB.DocumentClient.GetItemOutput = await documentManager.getItem(getParams);

    if (!output.Item) {
        throw panic.code(ERROR_CODE.RETRIEVE_ACCOUNT_UNDEFINED);
    }

    const accountEntity: AccountEntity = output.Item as AccountEntity;

    if (!accountEntity.verifyToken) {
        throw panic.code(ERROR_CODE.RETRIEVE_ACCOUNT_UNDEFINED);
    }

    if (accountEntity.verifyToken.value !== verifyString) {
        throw panic.code(ERROR_CODE.RETRIEVE_ACCOUNT_UNDEFINED);
    }

    return accountEntity;
};
