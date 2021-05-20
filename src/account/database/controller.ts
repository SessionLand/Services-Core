/**
 * @author SessionLand
 * @namespace Account_Database
 * @description Controller
 */

import { DynamoUpdateBuilder } from "@sudoo/dynamo-builder";
import { randomNumericString } from "@sudoo/random";
import { DocumentManager } from "../../common/database/document-manager";
import { ERROR_CODE, panic } from "../../common/error/panic";
import { AccountDynamoBuilder, AccountEntity, AccountTableName, AccountVerifyToken } from "./entity";

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

export const sendAndCreateAccount = async (email: string): Promise<AccountEntity> => {

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

    const builder: DynamoUpdateBuilder = AccountDynamoBuilder.update();

    const verifyToken: AccountVerifyToken = {

        identifier: "Test",
        expireAt: new Date().toISOString(),
        value: randomNumericString(6),
    };

    builder.where('verifyToken', verifyToken as any);

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = builder.build();

    const updateResult: AWS.DynamoDB.DocumentClient.UpdateItemOutput = await documentManager.updateAndGetNewData(params);

    return updateResult.Attributes as AccountEntity;
};
