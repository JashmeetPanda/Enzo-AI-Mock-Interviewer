import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_bZ6OLiqSITc5@ep-aged-moon-a5e7bq5e-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require'
  },
});
