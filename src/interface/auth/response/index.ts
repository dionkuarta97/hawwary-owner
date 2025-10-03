export interface ILoginResponse {
    user: {
      id: number;
      name: string;
      username: string;
      role: string;
      password_changed_at: string | null;
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
    };
    token: string;
  }
  