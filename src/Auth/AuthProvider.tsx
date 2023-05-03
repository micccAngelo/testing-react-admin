interface AuthProvider {
    login: (params: { username: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkError: (params: { status: number }) => Promise<void>;
    checkAuth: () => Promise<void>;
    getPermissions: () => Promise<void>;
  }
  
  export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: ({ username }: { username: string }): Promise<void> => {
      localStorage.setItem("username", username);
      // accept all username/password combinations
      return Promise.resolve();
    },
    // called when the user clicks on the logout button
    logout: (): Promise<void> => {
      localStorage.removeItem("username");
      return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }): Promise<void> => {
      if (status === 401 || status === 403) {
        localStorage.removeItem("username");
        return Promise.reject();
      }
      return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: (): Promise<void> => {
      return localStorage.getItem("username")
        ? Promise.resolve()
        : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: (): Promise<void> => Promise.resolve(),
  };
  