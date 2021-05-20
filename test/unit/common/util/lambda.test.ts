/**
 * @author SessionLand
 * @namespace Common_Util
 * @description Lambda
 * @override Unit Test
 */

import { APIGatewayProxyResult } from "aws-lambda";
import { expect } from "chai";
import * as Chance from "chance";
import { createNoBodyLambdaResponse } from "../../../../src/common/util/lambda";

describe('Given [Util-Lambda] Helper methods', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('util-lambda');

    it('should be able to generate no body error response', (): void => {

        const response: APIGatewayProxyResult = createNoBodyLambdaResponse();

        expect(response).to.be.deep.equal({
            body: JSON.stringify('No Body'),
            statusCode: 400,
        });
    });
});
