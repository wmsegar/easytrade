import { Request, Response } from "express";
import { version } from "./version.const";
import { Version } from "./version.types";

function getVersionString({buildVersion, buildDate, buildCommit}: Version): string {
    return `EasyTrade Offer Service Version: ${buildVersion}\n\nBuild date: ${buildDate}, git commit: ${buildCommit}`
}

function getVersionJson(version: Version): string {
    return JSON.stringify(version, null, 2);
}

export async function getVersion(req: Request, res: Response): Promise<void> {
    const acceptHeader = req.header("Accept")
    switch(acceptHeader) {
        case 'application/json':
            res.type('json').send(getVersionJson(version)); break;
        default:
            res.type('txt').send(getVersionString(version)); break;
    }
}