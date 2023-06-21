import { useSession } from 'next-auth/react'
import { useState } from 'react'

export const useComponentsController = () => {
  const { data: session } = useSession()

  const logged = !!session
  const loggedUserId = session?.user.id

  const [isOpenModalSignIn, setIsOpenModalSignIn] = useState(false)
  const [isOpenAvaliator, setIsOpenAvaliator] = useState(false)

  const handleOpenAvaliator = () => {
    if (logged) {
      setIsOpenAvaliator(true)
      return
    }
    setIsOpenModalSignIn(true)
  }
  const handleCloseAvaliator = () => {
    setIsOpenAvaliator(false)
  }
  const handleCloseSignInModal = () => {
    setIsOpenModalSignIn(false)
  }

  return {
    loggedUserId,
    isOpenModalSignIn,
    handleCloseSignInModal,
    isOpenAvaliator,
    handleOpenAvaliator,
    handleCloseAvaliator,
  }
}
