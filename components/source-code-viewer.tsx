"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Copy,
  Check,
  FileText,
  Package,
  Code,
  ExternalLink,
} from "lucide-react";
import { RegistryFile } from "@/lib/registry-utils";

interface ComponentData {
  name: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
}

interface SourceCodeViewerProps {
  componentName: string;
}

// Memoized SyntaxHighlighter component for better performance
const MemoizedSyntaxHighlighter = React.memo(
  ({
    language,
    content,
    isVisible,
  }: {
    language: string;
    content: string;
    isVisible: boolean;
  }) => {
    if (!isVisible) return null;

    return (
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          maxHeight: "60vh",
          overflow: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
        showLineNumbers
        wrapLines={true}
        wrapLongLines={true}
      >
        {content}
      </SyntaxHighlighter>
    );
  }
);

MemoizedSyntaxHighlighter.displayName = "MemoizedSyntaxHighlighter";

export function SourceCodeViewer({ componentName }: SourceCodeViewerProps) {
  const [sourceData, setSourceData] = useState<{
    component: ComponentData;
    sourceFiles: RegistryFile[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copiedStates, setCopiedStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [isOpen, setIsOpen] = useState(false);

  const fetchSourceCode = async () => {
    if (sourceData) return; // Don't fetch if already loaded

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/component-source/${componentName}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch source code");
      }

      setSourceData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch source code"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !sourceData) {
      fetchSourceCode();
    }
  };

  const copyToClipboard = useCallback(
    async (content: string, fileIndex: number) => {
      try {
        await navigator.clipboard.writeText(content);
        setCopiedStates(prev => ({ ...prev, [fileIndex]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({
            ...prev,
            [fileIndex]: false,
          }));
        }, 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    },
    []
  );

  const getLanguageFromFileName = useCallback((fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "tsx":
      case "ts":
        return "typescript";
      case "jsx":
      case "js":
        return "javascript";
      case "css":
        return "css";
      case "json":
        return "json";
      case "md":
        return "markdown";
      default:
        return "typescript";
    }
  }, []);

  const getFileTypeIcon = useCallback((type: string) => {
    switch (type) {
      case "registry:component":
        return <Code className="w-4 h-4" />;
      case "registry:page":
        return <FileText className="w-4 h-4" />;
      case "registry:lib":
        return <Package className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  }, []);

  // Memoize the rendered syntax highlighters for all files
  const renderedFiles = useMemo(() => {
    if (!sourceData) return [];

    return sourceData.sourceFiles.map((file, index) => ({
      ...file,
      language: getLanguageFromFileName(file.path.split("/").pop() || ""),
      component: (
        <MemoizedSyntaxHighlighter
          key={`${file.path}-${index}`}
          language={getLanguageFromFileName(file.path.split("/").pop() || "")}
          content={file.content}
          isVisible={index === activeFileIndex}
        />
      ),
    }));
  }, [sourceData, activeFileIndex, getLanguageFromFileName]);

  // Memoize the current file data to prevent unnecessary re-renders
  const currentFile = useMemo(() => {
    return renderedFiles[activeFileIndex];
  }, [renderedFiles, activeFileIndex]);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild className="hidden md:flex">
        <Button variant="outline" className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          View Source Code
          <ExternalLink className="w-3 h-3" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col h-full w-[80vw] sm:w-[75vw] md:w-[70vw] lg:w-[65vw] xl:w-[50vw] sm:max-w-none"
      >
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            {sourceData?.component.title || componentName} Source Code
          </SheetTitle>
          <SheetDescription>
            {sourceData?.component.description ||
              "View and copy the source code for this component"}
          </SheetDescription>
        </SheetHeader>

        <div className="overflow-auto space-y-6 flex-1">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center py-4">Error: {error}</div>
          )}

          {sourceData && (
            <div className="space-y-6">
              {/* Component metadata */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Component Information</h3>

                {/* Dependencies */}
                {(sourceData.component.dependencies ||
                  sourceData.component.registryDependencies) && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Dependencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {sourceData.component.dependencies?.map(dep => (
                        <Badge key={dep} variant="secondary">
                          npm: {dep}
                        </Badge>
                      ))}
                      {sourceData.component.registryDependencies?.map(dep => (
                        <Badge key={dep} variant="outline">
                          registry: {dep}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* File tabs */}
              {renderedFiles.length > 1 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Files
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {renderedFiles.map((file, index) => (
                      <Button
                        key={`tab-${index}`}
                        variant={
                          activeFileIndex === index ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setActiveFileIndex(index)}
                        className="flex items-center gap-2"
                      >
                        {getFileTypeIcon(file.type)}
                        {file.path.split("/").pop()}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Source code display */}
              {currentFile && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFileTypeIcon(currentFile.type)}
                      <span className="font-medium">
                        {currentFile.path.split("/").pop()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {currentFile.type}
                      </Badge>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        copyToClipboard(currentFile.content, activeFileIndex)
                      }
                      className="flex items-center gap-2"
                    >
                      {copiedStates[activeFileIndex] ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copiedStates[activeFileIndex] ? "Copied!" : "Copy"}
                    </Button>
                  </div>

                  <div className="rounded-md overflow-hidden border">
                    {currentFile.component}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
