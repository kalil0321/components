import { promises as fs } from "fs";
import path from "path";

export interface RegistryItem {
    name: string;
    type: string;
    title: string;
    description: string;
    dependencies?: string[];
    registryDependencies?: string[];
    files: Array<{
        path: string;
        type: string;
        target?: string;
    }>;
}

export interface SourceFile {
    path: string;
    content: string;
    type: string;
    fileName: string;
}

// Read the registry.json file
export async function getRegistry(): Promise<{ items: RegistryItem[] }> {
    try {
        const registryPath = path.join(process.cwd(), "registry.json");
        const registryContent = await fs.readFile(registryPath, "utf-8");
        return JSON.parse(registryContent);
    } catch (error) {
        console.error("Error reading registry:", error);
        return { items: [] };
    }
}

// Get a specific component from the registry
export async function getComponentFromRegistry(
    componentName: string
): Promise<RegistryItem | null> {
    const registry = await getRegistry();
    return registry.items.find((item) => item.name === componentName) || null;
}

// Read source code for a component
export async function getComponentSourceCode(
    componentName: string
): Promise<SourceFile[]> {
    const component = await getComponentFromRegistry(componentName);

    if (!component) {
        return [];
    }

    const sourceFiles: SourceFile[] = [];

    for (const file of component.files) {
        try {
            const filePath = path.join(process.cwd(), file.path);
            const content = await fs.readFile(filePath, "utf-8");
            const fileName = path.basename(file.path);

            sourceFiles.push({
                path: file.path,
                content,
                type: file.type,
                fileName,
            });
        } catch (error) {
            console.error(`Error reading file ${file.path}:`, error);
            // Continue with other files even if one fails
        }
    }

    return sourceFiles;
}
