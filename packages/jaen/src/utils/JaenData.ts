import {existsSync, readFileSync, writeFileSync} from 'fs'
import {resolve} from 'path'
import {Site} from '../types.js'

export type RemoteFileMigration = {
  createdAt: string
  fileUrl: string
}

export interface BaseEntity extends MigrationEntity {
  migrations: RemoteFileMigration[]
}

export interface MigrationEntity {
  context: RemoteFileMigration
}

export const getJSONFile = (filePath: string, defaultData: object = {}) => {
  if (!existsSync(filePath)) {
    writeJSONFile(filePath, defaultData)
  }

  const fileData = readFileSync(filePath, 'utf8')

  return JSON.parse(fileData)
}

export const writeJSONFile = (filePath: string, data: any) => {
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export class JaenData {
  #jaenDataDir: string

  pages: {
    [pageId: string]: BaseEntity
  }
  notifications: {
    [notificationId: string]: BaseEntity
  }
  internal?: {
    site: Site
    finderUrl?: string
    migrationHistory: Array<RemoteFileMigration>
  }

  constructor(options: {jaenDataDir: string}) {
    const absoluteJaenDataDir = resolve(options.jaenDataDir)

    if (!existsSync(absoluteJaenDataDir)) {
      throw new Error(
        `Jaen data directory does not exist: ${absoluteJaenDataDir}`
      )
    }

    this.#jaenDataDir = absoluteJaenDataDir
  }

  private readJSONFile(fileName: string, defaultData = {}) {
    return getJSONFile(`${this.#jaenDataDir}/${fileName}.json`, defaultData)
  }

  private writeJSONFile(fileName: string, data: any) {
    return writeJSONFile(`${this.#jaenDataDir}/${fileName}.json`, data)
  }

  read() {
    this.pages = this.readJSONFile('pages')
    this.notifications = this.readJSONFile('notifications')
    this.internal = this.readJSONFile('internal', {
      site: {},
      migrationHistory: []
    })
  }

  write() {
    this.writeJSONFile('pages', this.pages)
    this.writeJSONFile('notifications', this.notifications)
    this.writeJSONFile('internal', this.internal)
  }
}
