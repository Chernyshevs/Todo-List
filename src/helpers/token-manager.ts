class TokenManager {
  #accessToken: string = "";

  set accessToken(token: string) {
    this.#accessToken = token;
  }
  set refreshToken(token: string) {
    if (!token) {
      localStorage.removeItem("refresh-token");
      return;
    }
    localStorage.setItem("refresh-token", token);
  }
  get accessToken() {
    return this.#accessToken;
  }
  get refreshToken() {
    const refreshToken = localStorage.getItem("refresh-token");
    if (!refreshToken) {
      throw new Error("Invalid token");
    }
    return refreshToken;
  }
}

export const tokenManager = new TokenManager();
