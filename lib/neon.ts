import postgres from 'postgres';

let sqlClient: postgres.Sql | null = null;

export const getNeonSql = () => {
  if (!sqlClient) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    sqlClient = postgres(process.env.DATABASE_URL, {
      ssl: 'prefer',
      prepare: false, // Required for PgBouncer / transaction poolers (port 6543)
    });
  }
  return sqlClient;
};

// For backward compatibility or single instance use
export const sql = (strings: TemplateStringsArray, ...values: any[]) => {
  return getNeonSql()(strings, ...values);
};
