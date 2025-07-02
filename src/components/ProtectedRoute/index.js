import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({component: Component, bookshelvesList, ...rest}) => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <Route
      {...rest}
      render={props => (
        <Component {...props} bookshelvesList={bookshelvesList} />
      )}
    />
  )
}
export default ProtectedRoute
