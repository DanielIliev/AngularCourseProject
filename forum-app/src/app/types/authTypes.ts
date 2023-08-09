interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  repass: string;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
}

export { LoginCredentials, RegisterCredentials, UserData };
