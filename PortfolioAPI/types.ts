// Simple type definitions for Azure Static Web Apps managed functions
// No need for @azure/functions package

export interface Context {
    log: {
        (...args: any[]): void;
        error(...args: any[]): void;
        warn(...args: any[]): void;
        info(...args: any[]): void;
    };
    res?: {
        status: number;
        headers?: Record<string, string>;
        body?: any;
    };
}

export interface HttpRequest {
    method?: string;
    url?: string;
    headers?: Record<string, string>;
    query?: Record<string, string>;
    params?: Record<string, string>;
    body?: any;
}

