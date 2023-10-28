import { User } from '@prisma/client'

import { AvatarFallback, Avatar } from './ui/avatar'
import Image from 'next/image'
import { Icons } from './Icons'
import { AvatarProps } from '@radix-ui/react-avatar'

interface UserAvatarProps extends AvatarProps {

  // Pick is a ts ultil that allow us to enter a custom type
  user: Pick<User, 'name' | 'image'>
}

export function UserAvatar({ user, ...props }:UserAvatarProps) {
  
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            fill
            src={user.image}
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          {/* For people who use screen readers */}
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='w-5' />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar