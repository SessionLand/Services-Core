/**
 * @author SessionLand
 * @namespace Script
 * @description Init Database
 */

import { initializeAccountTable } from "../src/account/database/initialize";
import { S1Config } from "../src/common/util/config";
import { initializeSecurityTable } from "../src/security/database/initialize";

(async () => {

    try {

        await S1Config.update();

        const createAccountTableOutput: AWS.DynamoDB.CreateTableOutput = await initializeAccountTable();
        console.log(createAccountTableOutput);

        const createSecurityTableOutput: AWS.DynamoDB.CreateTableOutput = await initializeSecurityTable();
        console.log(createSecurityTableOutput);
    } catch (err) {

        console.log(err);
    }
})();
