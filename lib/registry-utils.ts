"use server";

export interface RegistryItem {
    name: string;
    type: string;
    title: string;
    description: string;
    dependencies?: string[];
    registryDependencies?: string[];
    files: RegistryFile[];
}

export interface RegistryFile {
    path: string;
    type: string;
    content: string;
}

// Get a specific component from the registry
export async function getComponentFromRegistry(
    componentName: string
): Promise<RegistryItem | null> {
    let baseUrl: string;

    baseUrl = "https://components.kalil0321.com"; // for some reason, the env var doesn't work...

    const url = `${baseUrl}/r/${componentName}.json`;
    console.log("Fetching component from registry:", url);
    const response = await fetch(url);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data as RegistryItem;
}

export async function getComponentSourceCode(
    componentName: string
): Promise<RegistryFile[]> {
    const component = await getComponentFromRegistry(componentName);

    if (!component) {
        return [];
    }

    const sourceFiles: RegistryFile[] = [];

    for (const file of component.files) {
        try {
            sourceFiles.push({
                path: file.path,
                content: file.content,
                type: file.type,
            });
        } catch (error) {
            console.error(`Error reading file ${file.path}:`, error);
            // Continue with other files even if one fails
        }
    }

    return sourceFiles;
}
