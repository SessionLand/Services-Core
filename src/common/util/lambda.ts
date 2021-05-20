/**
 * @author SessionLand
 * @namespace Common_Util
 * @description Lambda
 */

import { createLambdaResponse } from "@sudoo/lambda";
import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import { APIGatewayProxyResult } from "aws-lambda";

export const createNoBodyLambdaResponse = (): APIGatewayProxyResult => {

    return createLambdaResponse(HTTP_RESPONSE_CODE.BAD_REQUEST, 'No Body');
};
