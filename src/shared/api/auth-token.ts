let clientAuthToken: string | null = null;

export function getClientAuthToken(): string | null {
  return clientAuthToken;
}

export function setClientAuthToken(token: string | null): void {
  clientAuthToken = token;
}
