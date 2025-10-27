import { cookies } from 'next/headers';
import { prisma } from './prisma';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Generate a random session token
function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Verify admin password
export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    // Try to get password from database first
    const setting = await prisma.adminSettings.findUnique({
      where: { key: 'admin_password' },
    });

    if (setting) {
      return password === setting.value;
    }

    // Fallback to environment variable (for initial setup)
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminPassword) {
      return password === adminPassword;
    }

    console.error('No admin password configured in database or environment');
    return false;
  } catch (error) {
    console.error('Error verifying admin password:', error);
    // Fallback to environment variable if database fails
    const adminPassword = process.env.ADMIN_PASSWORD;
    return adminPassword ? password === adminPassword : false;
  }
}

// Create admin session
export async function createAdminSession(): Promise<string> {
  const sessionToken = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  try {
    await prisma.adminSession.create({
      data: {
        sessionToken,
        expiresAt,
      },
    });

    return sessionToken;
  } catch (error) {
    console.error('Error creating admin session:', error);
    throw new Error('Failed to create session');
  }
}

// Verify admin session
export async function verifyAdminSession(sessionToken: string): Promise<boolean> {
  try {
    const session = await prisma.adminSession.findFirst({
      where: {
        sessionToken,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    return session !== null;
  } catch (error) {
    console.error('Error verifying admin session:', error);
    return false;
  }
}

// Delete admin session (logout)
export async function deleteAdminSession(sessionToken: string): Promise<void> {
  try {
    await prisma.adminSession.deleteMany({
      where: {
        sessionToken,
      },
    });
  } catch (error) {
    console.error('Error deleting admin session:', error);
  }
}

// Clean up expired sessions
export async function cleanupExpiredSessions(): Promise<void> {
  try {
    await prisma.adminSession.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error);
  }
}

// Get current admin session from cookies
export async function getCurrentAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const sessionToken = await getCurrentAdminSession();

  if (!sessionToken) {
    return false;
  }

  return verifyAdminSession(sessionToken);
}
