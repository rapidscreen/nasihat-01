import { IUserRepository, IUser } from '@/types/auth';
import { dbManager } from '@/lib/database/connection';
import { v4 as uuidv4 } from 'uuid';

/**
 * User Repository implementation following SOLID principles:
 * - Single Responsibility: Only handles user data operations
 * - Open/Closed: Easy to extend with new user operations
 * - Liskov Substitution: Can be substituted with any IUserRepository implementation
 * - Interface Segregation: Implements only necessary user operations
 * - Dependency Inversion: Depends on database abstraction
 */
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    try {
      const db = await dbManager.getConnection();
      const row = await db.get(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      
      return row ? this.mapRowToUser(row) : null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Failed to find user');
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const db = await dbManager.getConnection();
      const row = await db.get(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      return row ? this.mapRowToUser(row) : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Failed to find user');
    }
  }

  async findByProvider(provider: string, providerId: string): Promise<IUser | null> {
    try {
      const db = await dbManager.getConnection();
      const row = await db.get(
        'SELECT * FROM users WHERE provider = ? AND provider_id = ?',
        [provider, providerId]
      );
      
      return row ? this.mapRowToUser(row) : null;
    } catch (error) {
      console.error('Error finding user by provider:', error);
      throw new Error('Failed to find user');
    }
  }

  async create(userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    try {
      const db = await dbManager.getConnection();
      const id = uuidv4();
      const now = new Date().toISOString();

      await db.run(
        `INSERT INTO users (id, email, name, password_hash, avatar, provider, provider_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          userData.email,
          userData.name,
          (userData as any).passwordHash || null,
          userData.avatar || null,
          userData.provider,
          userData.providerId || null,
          now,
          now
        ]
      );

      const newUser = await this.findById(id);
      if (!newUser) {
        throw new Error('Failed to create user');
      }

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser> {
    try {
      const db = await dbManager.getConnection();
      const now = new Date().toISOString();

      // Build dynamic update query
      const updates: string[] = [];
      const values: any[] = [];

      if (userData.email !== undefined) {
        updates.push('email = ?');
        values.push(userData.email);
      }
      if (userData.name !== undefined) {
        updates.push('name = ?');
        values.push(userData.name);
      }
      if (userData.avatar !== undefined) {
        updates.push('avatar = ?');
        values.push(userData.avatar);
      }
      if ((userData as any).passwordHash !== undefined) {
        updates.push('password_hash = ?');
        values.push((userData as any).passwordHash);
      }

      updates.push('updated_at = ?');
      values.push(now);
      values.push(id);

      await db.run(
        `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
        values
      );

      const updatedUser = await this.findById(id);
      if (!updatedUser) {
        throw new Error('User not found after update');
      }

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const db = await dbManager.getConnection();
      await db.run('DELETE FROM users WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  private mapRowToUser(row: any): IUser {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      avatar: row.avatar,
      provider: row.provider as 'linkedin' | 'email',
      providerId: row.provider_id,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
}