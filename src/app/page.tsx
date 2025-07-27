"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeNewLines, setRemoveNewLines] = useState(false);
  // Stats
  const [stats, setStats] = useState({
    inputLines: 0,
    outputLines: 0,
    originalChars: 0,
    processedChars: 0,
    originalWords: 0,
    processedWords: 0,
    originalTokens: 0,
    processedTokens: 0,
    reductionPercent: "0",
  });
  const handleProcess = () => {
    let result = inputText;
    const originalChars = inputText.length;
    const originalWords = inputText.trim().split(/\s+/).filter(Boolean).length;
    const originalTokens = Math.ceil(originalChars / 4);
    const inputLines = inputText.split("\n").length;
    if (removeExtraSpaces) {
      // Replace multiple spaces with single space
      result = result.replace(/\s{2,}/g, " ");
    }

    if (removeNewLines) {
      // Remove newlines completely
      result = result.replace(/\n+/g, " ");
    }
    const processedChars = result.length;
    const processedWords = result.trim().split(/\s+/).filter(Boolean).length;
    const processedTokens = Math.ceil(processedChars / 4);
    const outputLines = result.split("\n").length;

    const reductionPercent = (
      ((originalChars - processedChars) / originalChars) *
      100
    ).toFixed(2);

    setStats({
      inputLines,
      outputLines,
      originalChars,
      processedChars,
      originalWords,
      processedWords,
      originalTokens,
      processedTokens,
      reductionPercent,
    });
    setOutputText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    alert("Copied to clipboard!");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          DevUtil <span className="text-muted-foreground">– Whitespace Cleaner</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Remove extra spaces and new lines to optimize text for ChatGPT.
        </p>
      </div>
      <Card className="w-full max-w-2xl">

        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-40"
          />

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="removeExtraSpaces"
                checked={removeExtraSpaces}
                onCheckedChange={(checked) =>
                  setRemoveExtraSpaces(checked as boolean)
                }
              />
              <label htmlFor="removeExtraSpaces" className="text-sm">
                Remove extra spaces
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="removeNewLines"
                checked={removeNewLines}
                onCheckedChange={(checked) =>
                  setRemoveNewLines(checked as boolean)
                }
              />
              <label htmlFor="removeNewLines" className="text-sm">
                Remove new lines
              </label>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleProcess}>Process</Button>
            {outputText && <Button variant="outline" onClick={handleCopy}>Copy</Button>}
          </div>

          {outputText && (
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Original Stats */}
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm text-muted-foreground">
                      Original
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-xl font-bold">{stats.inputLines} Lines</p>
                    <p className="text-sm text-muted-foreground">
                      {stats.originalChars} chars
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stats.originalWords} words
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ~{stats.originalTokens} tokens
                    </p>
                  </CardContent>
                </Card>

                {/* Processed Stats */}
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm text-muted-foreground">
                      Processed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-xl font-bold">{stats.outputLines} Lines</p>
                    <p className="text-sm text-muted-foreground">
                      {stats.processedChars} chars
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stats.processedWords} words
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ~{stats.processedTokens} tokens
                    </p>
                  </CardContent>
                </Card>

                {/* Reduction */}
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm text-muted-foreground">
                      Reduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="text-3xl font-bold">
                      {stats.reductionPercent}%
                    </p>
                  </CardContent>
                </Card>
              </div>


              {/* Processed Text */}

              <Textarea
                value={outputText}
                readOnly
                className="h-40 bg-gray-100"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
