import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import path from 'path'
import payload, { type Payload } from 'payload'
import type { InitOptions } from 'payload/config'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
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

export const getPayloadClient = async ({
  initOptions,
}: IArgs = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is not defined')
  }

  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: 'ludwikowski.szym1993@gmail.com',
        fromName: 'DigitalHippo',
      },
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
