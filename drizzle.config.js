/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./app/utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://mydb_owner:iCkI0reMxq8u@ep-fragrant-cake-a1xcapkv.ap-southeast-1.aws.neon.tech:5432/Idea-Pallete?sslmode=require',
  },
};
