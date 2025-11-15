// share.js
import { getStorage } from './megaClient.js';

export async function createPublicLink(nodeId) {
  try {
    const storage = await getStorage();
    const node = storage.root.children.find(n => n.nodeId === nodeId);
    if (!node) throw new Error('File not found');

    const link = await node.link();
    return {
      success: true,
      publicLink: link,
      nodeId: node.nodeId,
      name: node.name
    };
  } catch (error) {
    throw new Error(`Share link creation failed: ${error.message}`);
  }
}

export async function createPublicLinkByName(filename, folderPath = null) {
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

    const link = await node.link();
    return {
      success: true,
      publicLink: link,
      nodeId: node.nodeId,
      name: node.name
    };
  } catch (error) {
    throw new Error(`Share link creation failed: ${error.message}`);
  }
}
