/* eslint-disable no-mixed-spaces-and-tabs */
class RequestManager {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.accessToken = null;
  }

  setAccessToken(token) {
    this.accessToken = token;
  }

  async sendRequest(endpoint, method, data = null) {
    const url = `${this.baseURL}${endpoint}`;

    // eslint-disable-next-line no-useless-catch
    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: this.accessToken ? `Bearer ${this.accessToken}` : "",
        },
        body: data instanceof FormData ? data : JSON.stringify(data),
        mode: "cors",
      };

      if (data instanceof FormData) {
        delete options.headers["Content-Type"];
      }

      if (method === "GET" || method === "DELETE") {
        delete options.body;
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw response.status;
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

// eslint-disable-next-line no-undef
export default RequestManager;
