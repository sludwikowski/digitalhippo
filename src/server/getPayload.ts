import dotenv from 'dotenv'
import path from 'path'
import payload from 'payload'
import type { InitOptions } from 'payload/config'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

let cached = (global as any).payload

if (!cached) {
  // eslint-disable-next-line
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

interface IArgs {
  initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({ initOptions }: IArgs = {}) => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is not defined')
  }

  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: !initOptions?.express,
      ...(initOptions || {}),
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}
