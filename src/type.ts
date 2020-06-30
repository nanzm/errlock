declare global {
  interface Window {
    _ANA_SDK_: any
  }
}

export interface Client {
  sendEvent(): string;
}

export interface Options {
  debug?: boolean;
  enabled?: boolean;

  server?: string;
  appId: string,
  secret: string,

  sampleRate?: number,
  ignoreErrors?: Array<string | RegExp>;

  env?: string;
  maxBreadcrumbs?: number;
}

export interface Breadcrumb {
  type?: string;
  level?: string;
  event_id?: string;
  category?: string;
  message?: string;
  data?: any;
  timestamp?: number;
}

export interface SdkInfo {
  name: string;
  version: string;
}
