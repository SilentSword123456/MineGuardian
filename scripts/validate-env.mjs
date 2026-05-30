const required = [
  'NEXT_PUBLIC_CONVEX_URL',
  'CONVEX_DEPLOYMENT',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'MINEGUARDIAN_BACKEND_URL',
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error('Missing required environment variables:');
  missing.forEach((key) => console.error(`- ${key}`));
  process.exit(1);
}

console.log('Environment variables look good.');
