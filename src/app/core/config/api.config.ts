// src/app/core/config/api.config.ts
export interface ApiConfig {
  baseUrl: string;
  endpoints: {
    domaines: string;
    evenements: string;
  };
}

export const API_CONFIG: ApiConfig = {
  baseUrl: '/JSON/fr',
  endpoints: {
    domaines: '/domaines.json',
    evenements: '/evenements.json'
  }
};
