/**
 * @author SessionLand
 * @namespace Security_Database
 * @description Entity
 */

import { DynamoBuilder } from "@sudoo/dynamo-builder";
import { fixTableName } from "../../common/database/table-name";

export const SecurityTableName: string = fixTableName('Security');
export const SecurityDynamoBuilder: DynamoBuilder = DynamoBuilder.create(SecurityTableName);

export const accountAuthorizationSecurityName: string = 'account-authorization';

export type SecurityConfig = {

    readonly category: string;
    readonly publicKey: string;
    readonly privateKey: string;
};

export type SecurityEntity = {

    readonly active: boolean;
    readonly createdAt: string;
} & SecurityConfig;
