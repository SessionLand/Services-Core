/**
 * @author SessionLand
 * @namespace Common_Error
 * @description Panic
 */

import { Panic } from "connor";

export const MODULE_NAME = 'Session-Services-Core';

export enum ERROR_CODE {

    PATTERN_DOES_NOT_MATCH_1 = 40000,
    INVALID_TOKEN = 40300,
    INVALID_AUTHORIZATION_FIELD = 40301,

    RETRIEVE_ACCOUNT_UNDEFINED = 40310,

    INVALID_PERMISSION = 43100,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.PATTERN_DOES_NOT_MATCH_1]: 'Pattern Does Not Match: {}',
    [ERROR_CODE.INVALID_TOKEN]: 'Invalid Token',
    [ERROR_CODE.INVALID_AUTHORIZATION_FIELD]: 'Invalid Authorization field',

    [ERROR_CODE.RETRIEVE_ACCOUNT_UNDEFINED]: 'Retrieve Account Undefined',

    [ERROR_CODE.INVALID_PERMISSION]: 'Invalid Permission',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);
