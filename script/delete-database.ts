/**
 * @author SessionLand
 * @namespace Script
 * @description Delete Database
 */

import { deleteAccountTable } from "../src/account/database/initialize";
import { S1Config } from "../src/common/util/config";
import { deleteSecurityTable } from "../src/security/database/initialize";

(async () => {

    try {

        await S1Config.update();

        const deleteAccountTableOutput: AWS.DynamoDB.DeleteTableOutput = await deleteAccountTable();
        console.log(deleteAccountTableOutput);

        const deleteSecurityTableOutput: AWS.DynamoDB.DeleteTableOutput = await deleteSecurityTable();
        console.log(deleteSecurityTableOutput);
    } catch (err) {

        console.log(err);
    }
})();
