import { environment } from '../../environments/environment';

const ROOTS = {
    baseBackendURL: environment.baseBackendURL
};

export const ENDPOINTS = {
    events: {
        getAll: ROOTS.baseBackendURL + 'event',        
    },
};