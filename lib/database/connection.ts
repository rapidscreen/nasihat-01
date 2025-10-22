import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

/**
 * Database connection utility following SOLID principles:
 * - Single Responsibility: Only handles database connection
 * - Open/Closed: Easy to extend with new database operations
 * - Dependency Inversion: Provides abstraction for database operations
 */

interface DatabaseConnection {
  run(sql: string, params?: any[]): Promise<sqlite3.RunResult>;
  get(sql: string, params?: any[]): Promise<any>;
  all(sql: string, params?: any[]): Promise<any[]>;
  close(): Promise<void>;
}

class SQLiteConnection implements DatabaseConnection {
  private db: sqlite3.Database;

  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath);
  }

  async run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  async get(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async all(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

// Singleton pattern for database connection
class DatabaseManager {
  private static instance: DatabaseManager;
  private connection: DatabaseConnection | null = null;

  private constructor() {}

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async getConnection(): Promise<DatabaseConnection> {
    if (!this.connection) {
      const dbPath = path.join(process.cwd(), 'data', 'app.db');
      this.connection = new SQLiteConnection(dbPath);
      await this.initializeDatabase();
    }
    return this.connection;
  }

  private async initializeDatabase(): Promise<void> {
    if (!this.connection) return;

    // Create users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password_hash TEXT,
        avatar TEXT,
        provider TEXT NOT NULL DEFAULT 'email',
        provider_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes for better performance
    const createEmailIndex = 'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)';
    const createProviderIndex = 'CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id)';

    try {
      await this.connection.run(createUsersTable);
      await this.connection.run(createEmailIndex);
      await this.connection.run(createProviderIndex);
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}

// Export the database manager instance
export const dbManager = DatabaseManager.getInstance();
export type { DatabaseConnection };