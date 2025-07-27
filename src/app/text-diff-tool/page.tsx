"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { parseDiff, Diff, Hunk } from "react-diff-view";
import "react-diff-view/style/index.css";

// Utility to create a simple unified diff format for react-diff-view
function createPatch(oldText: string, newText: string) {
    return `--- Original
+++ Modified
@@ -1 +1 @@
-${oldText}
+${newText}`;
}

export default function DiffTool() {
    const [oldText, setOldText] = useState("");
    const [newText, setNewText] = useState("");
    const [diffFiles, setDiffFiles] = useState<any[]>([]);

    const handleCompare = () => {
        const diff = createPatch(oldText, newText);
        const parsed = parseDiff(diff);
        setDiffFiles(parsed);
    };

    const handleClear = () => {
        setOldText("");
        setNewText("");
        setDiffFiles([]);
    };

    const handleSwap = () => {
        const temp = oldText;
        setOldText(newText);
        setNewText(temp);
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    DevUtil <span className="text-muted-foreground">– Diff & Compare</span>
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Compare two pieces of text or JSON side by side.
                </p>
            </div>

            {/* Input Card */}
            <Card className="w-full max-w-5xl mb-4">
                <CardHeader>
                    <CardTitle>Input Texts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Textarea
                            placeholder="Original text here..."
                            value={oldText}
                            onChange={(e) => setOldText(e.target.value)}
                            className="h-40"
                        />
                        <Textarea
                            placeholder="Modified text here..."
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className="h-40"
                        />
                    </div>

                    <div className="flex space-x-2">
                        <Button onClick={handleCompare}>Compare</Button>
                        <Button variant="outline" onClick={handleSwap}>
                            Swap
                        </Button>
                        <Button variant="destructive" onClick={handleClear}>
                            Clear
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Diff Output */}
            {diffFiles.length > 0 && (
                <Card className="w-full max-w-5xl">
                    <CardHeader>
                        <CardTitle>Comparison Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {diffFiles.map((file, i) => (
                            <Diff
                                key={i}
                                viewType="split" // split view
                                diffType={file.type}
                                hunks={file.hunks}
                            >
                                {(hunks) =>
                                    hunks.map((hunk) => (
                                        <Hunk key={hunk.content} hunk={hunk} />
                                    ))
                                }
                            </Diff>
                        ))}
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
