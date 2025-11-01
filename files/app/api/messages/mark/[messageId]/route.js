import prisma from '../../../prisma/Prisma'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ success: false, message: 'unauthorized' })

  const messageId = Number(params.messageId)
  if (!Number.isFinite(messageId)) return NextResponse.json({ success: false, message: 'invalid_id' })
  await prisma.messages.update({ where: { id: messageId }, data: { seen: true } })
  return NextResponse.json({ success: true })
}

