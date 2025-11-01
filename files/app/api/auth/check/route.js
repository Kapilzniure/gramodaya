import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return NextResponse.json({ success: false, message: 'unauthorized' }, { status: 200 })
  }
  const user = data.user
  return NextResponse.json({ success: true, user: {
    _id: user.id,
    fullName: user.user_metadata?.name || user.email,
    profilePic: user.user_metadata?.picture || null,
    bio: user.user_metadata?.bio || '',
  } })
}

