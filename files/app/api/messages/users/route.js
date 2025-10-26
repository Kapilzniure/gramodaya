import prisma from '../../../prisma/Prisma'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ success: false, message: 'unauthorized' })

  // For demo, return last 20 distinct chat partners and unseen counts
  const myId = user.id
  const peers = await prisma.$queryRawUnsafe(`
    SELECT other_id AS id FROM (
      SELECT DISTINCT ON (other_id) other_id, created_at FROM (
        SELECT sender_id AS other_id, created_at FROM "Messages" WHERE receiver_id = $1
        UNION ALL
        SELECT receiver_id AS other_id, created_at FROM "Messages" WHERE sender_id = $1
      ) t ORDER BY other_id, created_at DESC
    ) s ORDER BY created_at DESC LIMIT 20
  `, myId)

  const users = (peers || []).filter(p => p.id !== myId).map(p => ({
    _id: p.id,
    fullName: 'User ' + p.id.slice(0, 6),
    profilePic: null,
    bio: '',
  }))

  // unseen counts
  const unseenRows = await prisma.$queryRawUnsafe(`
    SELECT sender_id, COUNT(*) AS cnt FROM "Messages"
    WHERE receiver_id = $1 AND seen = false
    GROUP BY sender_id
  `, myId)
  const unseenMessages = {}
  for (const r of unseenRows) unseenMessages[r.sender_id] = Number(r.cnt)

  return NextResponse.json({ success: true, users, unseenMessages })
}

