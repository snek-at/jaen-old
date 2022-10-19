import fetch from 'node-fetch'
import deepmerge from 'deepmerge'

import {nodejsSafeJsonUpload} from '../utils/osg.js'
import {deepmergeArrayIdMerge} from '../utils/deepmerge.js'
import {logger} from './logger.js'
import packageJson from '../utils/packageJson.js'
import { JaenData, MigrationEntity, RemoteFileMigration } from '../utils/JaenData'


export interface BaseEntity extends MigrationEntity {
  migrations: RemoteFileMigration[]
}

type MigrationData = {
  [key: string]: any
}

export type CreateMigrationOptions = {
  migrationUrl: string
  jaenDataDir: string
}

export const createMigration = async ({
  migrationUrl,
  jaenDataDir
}: CreateMigrationOptions) => {




  try {

    const jaenData = new JaenData({jaenDataDir})

    const migration = await downloadMigrationFromUrl(migrationUrl)

    jaenData.read()

    await processMigration({
      jaenData,
      migration
    })

    jaenData.internal.migrationHistory.push({
      createdAt: new Date().toISOString(),
      fileUrl: migrationUrl
    })

    jaenData.write()
  } catch (err) {
    logger.error({err}, 'An error occurred while running the migration')
  }
}

const downloadMigrationFromUrl = async (
  migrationUrl: string
): Promise<MigrationData> => {
  const response = await fetch(migrationUrl)

  if (!response.ok) {
    throw new Error(
      `Could not download migration from ${migrationUrl}. Status code: ${response.status}`
    )
  }

  const migration = (await response.json()) as MigrationData

  return migration
}

export const downloadBaseContextFromUrl = async (
  entity: BaseEntity
): Promise<any> => {
  const {context} = entity

  const response = await fetch(context.fileUrl)

  if (!response.ok) {
    throw new Error(
      `Could not download context from ${context.fileUrl}. Status code: ${response.status}`
    )
  }

  const contextData = await response.json()

  return contextData
}

const processMigration = async ({
  jaenData,
  migration
}: {
  jaenData: JaenData
  migration: MigrationData
}) => {
  const keys = Object.keys(migration)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as string
    const value = migration[key]

    switch (key) {
      case 'jaen':
        jaenData.internal = deepmerge(jaenData.internal, value, {
          arrayMerge: deepmergeArrayIdMerge
        })

        break
      case 'pages':
      case 'JaenPages@0.0.1':
        for (const id of Object.keys(value.pages)) {
          jaenData.pages[id] = await updateEntity(
            jaenData.pages[id],
            value.pages[id]
          )
        }

        break
      case 'notifications':
        for (const id of Object.keys(value.notifications)) {
          jaenData.notifications[id] = await updateEntity(
            jaenData.notifications[id],
            value.notifications[id]
          )
        }
        break
    }

    logger.info(`Key: ${key} done (${i + 1}/${keys.length})`)
  }
}

// const updateInternalJaenData = () => {}

const updateEntity = async (
  baseEntity: BaseEntity | undefined,
  migrationData: object
): Promise<BaseEntity> => {
  // check if baseEntity is not a empty object

  if (!baseEntity?.context) {
    const newMigration = await uploadMigration(migrationData)
    return {
      context: newMigration,
      migrations: [newMigration]
    }
  } else {
    const baseData = await downloadBaseContextFromUrl(baseEntity)
    // !TODO: Implement merging logic
    const mergedData = deepmerge<any>(baseData, migrationData, {
      arrayMerge: deepmergeArrayIdMerge
    }) //{...baseData, ...migrationData}

    const newMigration = await uploadMigration(mergedData)

    return {
      context: baseEntity.context,
      migrations: [...baseEntity.migrations, newMigration]
    }
  }
}

const uploadMigration = async (data: object): Promise<RemoteFileMigration> => {
  const fileUrl = await nodejsSafeJsonUpload({
    payload: JSON.stringify(data),
    fileName: `${packageJson.name}@${packageJson.version}-migration.json`
  })

  const newMigration = {
    createdAt: new Date().toISOString(),
    fileUrl
  }

  return newMigration
}

