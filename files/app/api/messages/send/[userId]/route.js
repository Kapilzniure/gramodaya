import prisma from '../../../prisma/Prisma'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ success: false, message: 'unauthorized' })

  const peerId = params.userId
  const body = await request.json()
  const created = await prisma.messages.create({
    data: {
      sender_id: user.id,
      receiver_id: peerId,
      text: body?.text || null,
      image: body?.image || null,
    }
  })
  return NextResponse.json({ success: true, message: {
    _id: created.id,
    senderId: created.sender_id,
    receiverId: created.receiver_id,
    text: created.text,
    image: created.image,
    createdAt: created.created_at,
  }})
}

