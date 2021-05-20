/**
 * @author SessionLand
 * @namespace Common_Database
 * @description Table Manager
 */

import * as AWS from "aws-sdk";
import { S1Config } from "../util/config";

export class TableManager {

    private static _instance?: TableManager;

    public static get instance(): TableManager {

        if (!this._instance) {
            this._instance = new TableManager();
        }
        return this._instance;
    }

    private readonly _dynamodb: AWS.DynamoDB;

    private constructor() {

        this._dynamodb = new AWS.DynamoDB();
    }

    public async createTable(params: AWS.DynamoDB.CreateTableInput): Promise<AWS.DynamoDB.CreateTableOutput> {

        if (!S1Config.check()) {
            throw new Error('[Session-Services-Core] Initialize check failed');
        }

        return await new Promise<AWS.DynamoDB.CreateTableOutput>((resolve: (output: AWS.DynamoDB.CreateTableOutput) => void, reject: (reason: any) => void) => {

            this._dynamodb.createTable(
                params,
                (err: any, data: AWS.DynamoDB.CreateTableOutput) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                },
            );
        });
    }

    public async deleteTable(params: AWS.DynamoDB.DeleteTableInput): Promise<AWS.DynamoDB.DeleteTableOutput> {

        if (!S1Config.check()) {
            throw new Error('[Session-Services-Core] Initialize check failed');
        }

        return await new Promise<AWS.DynamoDB.DeleteTableOutput>((resolve: (output: AWS.DynamoDB.DeleteTableOutput) => void, reject: (reason: any) => void) => {

            this._dynamodb.deleteTable(
                params,
                (err: any, data: AWS.DynamoDB.DeleteTableOutput) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                },
            );
        });
    }
}
