/**
 * @author SessionLand
 * @namespace Common_Database
 * @description Document Manager
 */

import * as AWS from "aws-sdk";
import { S1Config } from "../util/config";

export class DocumentManager {

    private static _instance?: DocumentManager;

    public static get instance(): DocumentManager {

        if (!this._instance) {
            this._instance = new DocumentManager();
        }
        return this._instance;
    }

    private readonly _documentClient: AWS.DynamoDB.DocumentClient;

    private constructor() {

        this._documentClient = new AWS.DynamoDB.DocumentClient();
    }

    public async putData(params: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<void> {

        if (!S1Config.check()) {
            throw new Error('[Session-Services-Core] Initialize check failed');
        }

        return await new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

            this._documentClient.put(
                params,
                (err: any) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
    }

    public async updateAndGetNewData(params: AWS.DynamoDB.DocumentClient.UpdateItemInput): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {

        if (!S1Config.check()) {
            throw new Error('[Session-Services-Core] Initialize check failed');
        }

        return await new Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput>((resolve: (data: AWS.DynamoDB.DocumentClient.UpdateItemOutput) => void, reject: (reason: any) => void) => {

            this._documentClient.update(
                {
                    ...params,
                    ReturnValues: 'UPDATED_NEW',
                },
                (err: any, data: AWS.DynamoDB.DocumentClient.UpdateItemOutput) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                },
            );
        });
    }

    public async getItem(params: AWS.DynamoDB.DocumentClient.GetItemInput): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {

        if (!S1Config.check()) {
            throw new Error('[Session-Services-Core] Initialize check failed');
        }

        return await new Promise<AWS.DynamoDB.DocumentClient.GetItemOutput>((resolve: (data: AWS.DynamoDB.DocumentClient.GetItemOutput) => void, reject: (reason: any) => void) => {

            this._documentClient.get(
                params,
                (err: any, data: AWS.DynamoDB.DocumentClient.GetItemOutput) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                },
            );
        });
    }

    public async batchGetItem(params: AWS.DynamoDB.DocumentClient.BatchGetItemInput): Promise<AWS.DynamoDB.DocumentClient.BatchGetItemOutput> {

        if (!S1Config.check()) {
            throw new Error('[Session-Services-Core] Initialize check failed');
        }

        return await new Promise<AWS.DynamoDB.DocumentClient.BatchGetItemOutput>((resolve: (data: AWS.DynamoDB.DocumentClient.BatchGetItemOutput) => void, reject: (reason: any) => void) => {

            this._documentClient.batchGet(
                params,
                (err: any, data: AWS.DynamoDB.DocumentClient.BatchGetItemOutput) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                },
            );
        });
    }

    public async queryItems(params: AWS.DynamoDB.DocumentClient.QueryInput): Promise<AWS.DynamoDB.DocumentClient.QueryOutput> {

        if (!S1Config.check()) {
            throw new Error('[Session-Services-Core] Initialize check failed');
        }

        return await new Promise<AWS.DynamoDB.DocumentClient.QueryOutput>((resolve: (data: AWS.DynamoDB.DocumentClient.QueryOutput) => void, reject: (reason: any) => void) => {

            this._documentClient.query(
                params,
                (err: any, data: AWS.DynamoDB.DocumentClient.QueryOutput) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                },
            );
        });
    }

    public async scanItems(params: AWS.DynamoDB.DocumentClient.ScanInput): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {

        if (!S1Config.check()) {
            throw new Error('[Session-Services-Core] Initialize check failed');
        }

        return await new Promise<AWS.DynamoDB.DocumentClient.ScanOutput>((resolve: (data: AWS.DynamoDB.DocumentClient.ScanOutput) => void, reject: (reason: any) => void) => {

            this._documentClient.scan(
                params,
                (err: any, data: AWS.DynamoDB.DocumentClient.ScanOutput) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                },
            );
        });
    }

    public async continuesScanItems<T extends any>(params: AWS.DynamoDB.DocumentClient.ScanInput): Promise<T[]> {

        if (!S1Config.check()) {
            throw new Error('[Session-Services-Core] Initialize check failed');
        }

        const results: T[] = [];
        let exclusiveStartKey: any;

        // eslint-disable-next-line no-constant-condition
        while (true) {

            const output: AWS.DynamoDB.DocumentClient.ScanOutput = await this.scanItems({
                ...params,
                ExclusiveStartKey: exclusiveStartKey,
            });
            if (!output.Items) {
                return results;
            }
            for (const item of output.Items) {
                results.push(item as any);
            }
            if (typeof output.LastEvaluatedKey === 'undefined') {
                return results;
            }
            exclusiveStartKey = output.LastEvaluatedKey;
        }
    }
}
