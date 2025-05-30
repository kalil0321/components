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
    // Use a more reliable base URL construction to prevent hydration mismatches
    let baseUrl: string;

    if (typeof window !== "undefined") {
        // Client-side: use window.location
        baseUrl = `${window.location.protocol}//${window.location.host}`;
    } else {
        // Server-side: use environment variables with fallback
        const port = process.env.PORT || 3000;
        baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${port}`;
    }

    const url = `${baseUrl}/r/${componentName}.json`;
    console.log("Fetching component from registry:", url);
    const response = await fetch(url);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data as RegistryItem;
}

// Read source code for a component
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
