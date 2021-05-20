/**
 * @author SessionLand
 * @namespace Account_Database
 * @description Entity
 */

import { DynamoBuilder } from "@sudoo/dynamo-builder";
import { fixTableName } from "../../common/database/table-name";

export const AccountTableName: string = fixTableName('Account');
export const AccountDynamoBuilder: DynamoBuilder = DynamoBuilder.create(AccountTableName);

export type AccountVerifyToken = {

    readonly value: string;
    readonly expireAt: string;
    readonly identifier: string;
};

export type AccountConfig = {

    readonly email: string;
};

export type AccountEntity = {

    readonly active: boolean;
    readonly createdAt: string;

    readonly verifyToken: AccountVerifyToken;
} & AccountConfig;
