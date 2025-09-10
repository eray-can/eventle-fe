import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

const nextConfig: NextConfig = {
  env: {
    TZ: 'Europe/Istanbul',
  },
};

export default withNextIntl(nextConfig);
