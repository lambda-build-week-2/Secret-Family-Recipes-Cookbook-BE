const extractUser = (user, token) => {
  const { id, firstname, lastname, email } = user;
  return {
      id,
      firstname,
      lastname,
      email,
      token
  }
}

export default extractUser;
