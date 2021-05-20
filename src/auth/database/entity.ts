/**
 * @author SessionLand
 * @namespace Auth_Database
 * @description Entity
 */

import { DynamoBuilder } from "@sudoo/dynamo-builder";
import { fixTableName } from "../../common/database/table-name";

export const AuthTableName: string = fixTableName('Auth');
export const AuthDynamoBuilder: DynamoBuilder = DynamoBuilder.create(AuthTableName);

export type AuthConfig = {

    readonly email: string;
};

export type AuthEntity = {

    readonly active: boolean;
    readonly createdAt: string;
} & AuthConfig;
