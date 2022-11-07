import { Box } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { userAuth } from '../hooks/userAuth'

import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/Signin'

export function Routes() {
  const { user } = userAuth()

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  )
}
