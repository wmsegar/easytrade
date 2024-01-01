import { version as buildVersion, buildDate, buildCommit } from '../../package.json'
import { Version } from './version.types'

export const version: Version = {
    buildVersion: buildVersion,
    buildDate: buildDate,
    buildCommit: buildCommit
}