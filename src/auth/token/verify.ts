/**
 * @author SessionLand
 * @namespace Auth_Token
 * @description Verify
 */

import { ERROR_CODE, panic } from "../../common/util/panic";
import { AuthToken, parseVerifyAuthToken } from "./token";

const getAuthorizationField = (headers: any): any => {

    if (headers.Authorization) {
        return headers.Authorization;
    }
    return headers.authorization;
};

export const verifyAndGetToken = async (headers: any): Promise<AuthToken> => {

    const authorization: string = getAuthorizationField(headers);

    if (typeof authorization !== 'string') {
        throw panic.code(ERROR_CODE.INVALID_AUTHORIZATION_FIELD);
    }

    if (authorization.substring(0, 7) !== 'bearer ') {
        throw panic.code(ERROR_CODE.INVALID_AUTHORIZATION_FIELD);
    }

    const rawToken: string = authorization.substring(7);
    const token: AuthToken = await parseVerifyAuthToken(rawToken);

    if (typeof token.body.email !== 'string') {
        throw panic.code(ERROR_CODE.INVALID_TOKEN);
    }

    return token;
};
