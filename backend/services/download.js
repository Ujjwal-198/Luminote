// download.js
import { getStorage } from './megaClient.js';

function findNodeRecursively(folder, nodeId) {
    // Check current folder
    const node = folder.children.find(n => n.nodeId === nodeId);
    if (node) return node;

    // Search in subfolders
    for (const child of folder.children) {
        if (child.directory) {
            const found = findNodeRecursively(child, nodeId);
            if (found) return found;
        }
    }
    return null;
}

export async function downloadFile(nodeId) {
    try {
        const storage = await getStorage();

        const node = findNodeRecursively(storage.root, nodeId);
        if (!node) throw new Error('File not found');

        return {
            stream: node.download(),
            name: node.name,
            size: node.size
        };
    } catch (error) {
        throw new Error(`Download failed: ${error.message}`);
    }
}

export async function downloadFileByName(filename, folderPath = null) {
    try {
        const storage = await getStorage();

        let searchRoot = storage.root;
        if (folderPath) {
            const parts = folderPath.replace(/^\/+/, '').split('/').filter(Boolean);
            for (const part of parts) {
                searchRoot = searchRoot.children.find(n => n.name === part && n.directory);
                if (!searchRoot) throw new Error(`Folder ${folderPath} not found`);
            }
        }

        const node = searchRoot.children.find(n => n.name === filename && !n.directory);
        if (!node) throw new Error('File not found');

        return {
            stream: node.download(),
            name: node.name,
            size: node.size
        };
    } catch (error) {
        throw new Error(`Download failed: ${error.message}`);
    }
}
