/**
 * @author SessionLand
 * @namespace Script
 * @description Init Database
 */

import { initializeAuthTable } from "../src/auth/database/initialize";
import { S1Config } from "../src/common/util/config";
import { initializeSecurityTable } from "../src/security/database/initialize";

(async () => {

    try {

        await S1Config.update();

        const createAuthTableOutput: AWS.DynamoDB.CreateTableOutput = await initializeAuthTable();
        console.log(createAuthTableOutput);

        const createSecurityTableOutput: AWS.DynamoDB.CreateTableOutput = await initializeSecurityTable();
        console.log(createSecurityTableOutput);
    } catch (err) {

        console.log(err);
    }
})();
