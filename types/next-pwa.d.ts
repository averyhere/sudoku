declare module 'next-pwa' {
  import { NextConfig } from 'next';

  interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    clientsClaim?: boolean;
    sw?: string;
    publicExcludes?: string[];
    buildExcludes?: (RegExp | string | ((chunk: any) => boolean))[];
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
      font?: string;
    };
    cacheOnFrontEndNav?: boolean;
    subdomainPrefix?: string;
    reloadOnOnline?: boolean;
    scope?: string;
    dynamicStartUrlRedirect?: string;
    cacheStartUrl?: boolean;
    customWorkerDir?: string;
    workboxOptions?: any;
  }

  function withPWA(pwaConfig: PWAConfig): (nextConfig?: NextConfig) => NextConfig;

  export default withPWA;
}
