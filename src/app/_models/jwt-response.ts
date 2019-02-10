export interface JwtResponse {
  user: {
    id: number,
    username: string,
    email: string,
    api_token: string,
    expires_in: number
}
}
