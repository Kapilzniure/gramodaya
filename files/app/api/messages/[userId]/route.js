import prisma from '../../prisma/Prisma'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ success: false, message: 'unauthorized' })
  const peerId = params.userId
  const msgs = await prisma.messages.findMany({
    where: {
      OR: [
        { sender_id: user.id, receiver_id: peerId },
        { sender_id: peerId, receiver_id: user.id },
      ],
    },
    orderBy: { created_at: 'asc' },
  })
  const mapped = msgs.map(m => ({
    _id: m.id,
    senderId: m.sender_id,
    receiverId: m.receiver_id,
    text: m.text,
    image: m.image,
    createdAt: m.created_at,
  }))
  return NextResponse.json({ success: true, messages: mapped })
}

