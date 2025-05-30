import { NextRequest, NextResponse } from "next/server";
import {
    getComponentSourceCode,
    getComponentFromRegistry,
} from "@/lib/registry-utils";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ name: string }> }
) {
    try {
        const { name } = await params;
        const componentName = name;

        if (!componentName) {
            return NextResponse.json(
                { error: "Component name is required" },
                { status: 400 }
            );
        }

        // Get component metadata
        const component = await getComponentFromRegistry(componentName);

        if (!component) {
            return NextResponse.json(
                { error: "Component not found" },
                { status: 404 }
            );
        }

        // Get source code files
        const sourceFiles = await getComponentSourceCode(componentName);

        return NextResponse.json({
            component,
            sourceFiles,
        });
    } catch (error) {
        console.error("Error fetching component source:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
