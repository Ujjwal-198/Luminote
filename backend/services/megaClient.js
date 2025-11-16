// megaClient.js
import 'dotenv/config';
import { Storage } from 'megajs';

// Create and await a logged-in storage instance
export async function getStorage() {
    try {
        console.log('Connecting to MEGA with email:', process.env.MEGA_EMAIL);
        const storage = new Storage({
            email: process.env.MEGA_EMAIL,
            password: process.env.MEGA_PASSWORD,
            userAgent: process.env.MEGA_UA || 'MegaNodeSample/1.0'
        });

        console.log('Waiting for MEGA session...');
        
        // Add timeout for MEGA connection
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('MEGA connection timeout')), 10000)
        );
        
        await Promise.race([storage.ready, timeout]);
        console.log('✅ MEGA session ready');
        return storage;
    } catch (error) {
        console.error('❌ MEGA connection failed:', error.message);
        if (error.code === 'ENOTFOUND' || error.message.includes('fetch failed')) {
            throw new Error('MEGA service is currently unavailable. Please check your internet connection.');
        }
        if (error.message.includes('EBLOCKED') || error.message.includes('User blocked')) {
            throw new Error('MEGA account is temporarily blocked. File downloads are currently unavailable.');
        }
        throw error;
    }
}
