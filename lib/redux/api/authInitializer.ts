// lib/redux/api/authInitializer.ts
import { auth } from './ghanaJollofApi';

export async function initializeApp() {
  try {
    const isAuthenticated = await auth.ensureAuthenticated();
    console.log('App initialized with authentication:', isAuthenticated);
    return isAuthenticated;
  } catch (error) {
    console.error('Failed to initialize app authentication:', error);
    return false;
  }
}

// Call initializeApp when this module is imported
initializeApp().catch(console.error);