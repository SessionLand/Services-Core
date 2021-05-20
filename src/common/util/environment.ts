/**
 * @author SessionLand
 * @namespace Common_Util
 * @description Environment
 */

export const isProduction = (): boolean => {

    const env: string = String(process.env.NODE_ENV);
    if (env.toUpperCase() === 'PRODUCTION') {
        return false; // TODO: Fix table name env
    }
    return false;
};
