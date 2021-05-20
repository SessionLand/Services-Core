/**
 * @author SessionLand
 * @namespace Common_Database
 * @description Table Name
 */

import { isProduction } from "../util/environment";

export const fixTableName = (tableName: string): string => {

    const production: boolean = isProduction();
    const productionText: string = production
        ? 'Production'
        : 'Development';

    return `Session-Services-Core-${productionText}-${tableName}`;
};
