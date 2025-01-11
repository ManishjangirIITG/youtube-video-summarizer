import { NhostClient } from '@nhost/nextjs';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || '',
  // adminSecret: process.env.NHOST_ADMIN_SECRET,
  authUrl: `https://${process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN}.${process.env.NEXT_PUBLIC_NHOST_REGION}.nhost.run/v1/auth`,
  // storageUrl: `https://${process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN}.${process.env.NEXT_PUBLIC_NHOST_REGION}.nhost.run/v1/storage`,
  graphqlUrl: `https://${process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN}.${process.env.NEXT_PUBLIC_NHOST_REGION}.nhost.run/v1/graphql`,
});

export { nhost };