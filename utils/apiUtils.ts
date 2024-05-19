export function validateToken(token: string | undefined | null) {
  if (!token || !process.env.API_TOKEN) return false;
  return token == process.env.API_TOKEN 
}