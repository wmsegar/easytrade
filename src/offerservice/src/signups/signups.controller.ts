import superagent from "superagent"
import { Request, Response } from "express"
import { logger } from "../logger"
import { LoginServiceUrls } from "../urls/urls"

export async function signUpNewUser(
    req: Request,
    response: Response
): Promise<void> {
    try {
        const url = LoginServiceUrls.getCreateNewUserUrl()
        logger.info(
            `Sending signup request for [${JSON.stringify(
                req.body
            )}] to [${url.toString()}]`
        )
        const res = await superagent
            //.post("http://localhost:8086/api/Accounts/CreateNewAccount")
            //.post("http://{IP_ADDRESS}:8086/api/Accounts/CreateNewAccount")
            .post(url.toString())
            .send(req.body)

        logger.info(`User signup response [${JSON.stringify(res)}]`)

        response.status(201).json(res.body)
    } catch (err: any) {
        logger.error(
            `Error when trying to signup user [${err.response?.error}]`
        )
        response
            .status(err.response?.status ?? 500)
            .json(err.response?.text ?? "Unexpected server side error! " + err)
    }
}
