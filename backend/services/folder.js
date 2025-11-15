// folder.js
import { getStorage } from './megaClient.js';

export async function ensureFolder(folderPath = '/Uploads/Notes') {
    try {
        console.log('Ensuring folder exists:', folderPath);
        const storage = await getStorage();
        const parts = folderPath.replace(/^\/+/, '').split('/').filter(Boolean);
        console.log('Folder parts:', parts);

        let current = storage.root;
        for (const part of parts) {
            let next = current.children.find(n => n.name === part && n.directory);
            if (!next) {
                console.log('Creating folder:', part);
                next = await current.mkdir(part);
                console.log('✅ Folder created:', part);
            } else {
                console.log('✅ Folder exists:', part);
            }
            current = next;
        }
        console.log('✅ Final folder ready:', current.name);
        return current;
    } catch (error) {
        console.error('❌ Folder creation error:', error.message);
        throw new Error(`Folder creation failed: ${error.message}`);
    }
}

export async function listFolder(folderPath = '/') {
    try {
        const storage = await getStorage();

        let current = storage.root;
        if (folderPath !== '/') {
            const parts = folderPath.replace(/^\/+/, '').split('/').filter(Boolean);
            for (const part of parts) {
                current = current.children.find(n => n.name === part && n.directory);
                if (!current) throw new Error(`Folder ${folderPath} not found`);
            }
        }

        return current.children.map(node => ({
            name: node.name,
            nodeId: node.nodeId,
            isDirectory: node.directory,
            size: node.size || 0
        }));
    } catch (error) {
        throw new Error(`List folder failed: ${error.message}`);
    }
}
