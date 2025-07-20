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

  const handleProcess = () => {
    let result = inputText;

    if (removeExtraSpaces) {
      // Replace multiple spaces with single space
      result = result.replace(/\s{2,}/g, " ");
    }

    if (removeNewLines) {
      // Remove newlines completely
      result = result.replace(/\n+/g, " ");
    }

    setOutputText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    alert("Copied to clipboard!");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>DevUtil - Whitespace Cleaner</CardTitle>
        </CardHeader>
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
            <Textarea
              value={outputText}
              readOnly
              className="h-40 bg-gray-100"
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
