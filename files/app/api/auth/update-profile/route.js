import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PUT(request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ success: false, message: 'unauthorized' })

  const body = await request.json()
  const metadata = {
    name: body?.fullName ?? user.user_metadata?.name,
    picture: body?.profilePic ?? user.user_metadata?.picture,
    bio: body?.bio ?? user.user_metadata?.bio,
  }
  const { error } = await supabase.auth.updateUser({ data: metadata })
  if (error) return NextResponse.json({ success: false, message: error.message })

  return NextResponse.json({ success: true, user: {
    _id: user.id,
    fullName: metadata.name,
    profilePic: metadata.picture,
    bio: metadata.bio,
  }})
}

