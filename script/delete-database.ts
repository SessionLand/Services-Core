/**
 * @author SessionLand
 * @namespace Script
 * @description Delete Database
 */

import { deleteAuthTable } from "../src/auth/database/initialize";
import { S1Config } from "../src/common/util/config";
import { deleteSecurityTable } from "../src/security/database/initialize";

(async () => {

    try {

        await S1Config.update();

        const deleteAuthTableOutput: AWS.DynamoDB.DeleteTableOutput = await deleteAuthTable();
        console.log(deleteAuthTableOutput);

        const deleteSecurityTableOutput: AWS.DynamoDB.DeleteTableOutput = await deleteSecurityTable();
        console.log(deleteSecurityTableOutput);
    } catch (err) {

        console.log(err);
    }
})();
