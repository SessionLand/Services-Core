/**
 * @author SessionLand
 * @namespace Auth
 * @description Token
 */


import { JWTToken } from "@sudoo/jwt";
import { ERROR_CODE, panic } from "../../common/util/panic";

export type TokenHeader = {

};

export type TokenBody = {

    readonly email: string;
};

export type AuthToken = JWTToken<TokenHeader, TokenBody>;

export const parseVerifyAuthToken = async (token: string): Promise<AuthToken> => {

    const instance: AuthToken = JWTToken.fromTokenThrowable(token);
    const valid: boolean = instance.verifyExpiration(new Date());

    if (!valid) {
        throw panic.code(ERROR_CODE.INVALID_TOKEN);
    }

    // const security: SecurityEntity = await getOrCreateSecurityEntity(accountAuthorizationSecurityName);

    // const signed: boolean = instance.verifySignature(security.publicKey);

    // if (!signed) {
    //     throw panic.code(ERROR_CODE.INVALID_TOKEN);
    // }
    return null as any;
};
