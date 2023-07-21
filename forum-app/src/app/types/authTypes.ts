interface LoginCredentials {
    username: string,
    password: string
}

interface RegisterCredentials {
    username: string,
    email: string,
    password: string,
    repass: string
}

export {
    LoginCredentials,
    RegisterCredentials
}