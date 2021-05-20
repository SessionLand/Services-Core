/**
 * @author SessionLand
 * @namespace Database_Security
 * @description Controller
 */

import { generateKeyPair, KeyPair } from "@sudoo/token";
import { DocumentManager } from "../../common/database/document-manager";
import { SecurityEntity, SecurityTableName } from "./entity";

export const getOrCreateSecurityEntity = async (category: string): Promise<SecurityEntity> => {

    const parsedCategory: string = category.trim().toLowerCase();
    const documentManager: DocumentManager = DocumentManager.instance;

    const getParams: AWS.DynamoDB.DocumentClient.GetItemInput = {

        TableName: SecurityTableName,
        Key: {
            category: parsedCategory,
        },
    };

    const getOutput: AWS.DynamoDB.DocumentClient.GetItemOutput = await documentManager.getItem(getParams);

    if (getOutput.Item) {
        return getOutput.Item as SecurityEntity;
    }

    const keyPair: KeyPair = generateKeyPair();

    const securityEntity: SecurityEntity = {

        active: true,
        createdAt: new Date().toISOString(),
        category: parsedCategory,
        publicKey: keyPair.public,
        privateKey: keyPair.private,
    };

    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {

        TableName: SecurityTableName,
        Item: securityEntity,
    };

    await documentManager.putData(params);

    return securityEntity;
};
