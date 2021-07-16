export interface GoogleAuthResponse {
    message: string,
    user: { email: string, firstName: string, lastName: string, picture: string, accessToken: string }
}