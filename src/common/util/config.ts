/**
 * @author SessionLand
 * @namespace Common_Util
 * @description Config
 */

import * as AWS from "aws-sdk";

export class S1Config {

    private static _initiated: boolean = false;

    public static async update(): Promise<void> {

        if (this._initiated) {
            return;
        }

        if (process.env.DEVELOPMENT_AWS_ACCESS_KEY_ID !== 'NONE'
            || process.env.DEVELOPMENT_AWS_SECRET_ACCESS_KEY !== 'NONE') {

            const accessKeyId: string = process.env.DEVELOPMENT_AWS_ACCESS_KEY_ID as string;
            const secretAccessKey: string = process.env.DEVELOPMENT_AWS_SECRET_ACCESS_KEY as string;

            AWS.config.update({
                region: "us-east-1",
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                },
            });
        }

        this._initiated = true;
        return;
    }

    public static check(): boolean {

        return this._initiated;
    }

    public static ensure(): void {

        if (!this.check()) {
            throw new Error('[Services-Core] Initialize check failed');
        }

        return;
    }
}
