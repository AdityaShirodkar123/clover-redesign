"use client";

import { useState } from "react";
import { Shuffle, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface NumberPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
  onConfirm: (numbers: number[], powerball?: number) => void;
}

export default function NumberPickerModal({
  isOpen,
  onClose,
  gameName,
  onConfirm
}: NumberPickerModalProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [powerball, setPowerball] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const maxNumbers = gameName.toLowerCase().includes("powerball") ? 5 : 6;
  const maxMainNumber = gameName.toLowerCase().includes("powerball") ? 69 : 47;
  const maxPowerball = gameName.toLowerCase().includes("powerball") ? 26 : 27;
  const needsPowerball =
    gameName.toLowerCase().includes("powerball") ||
    gameName.toLowerCase().includes("mega");

  const handleNumberClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < maxNumbers) {
      setSelectedNumbers([...selectedNumbers, number].sort((a, b) => a - b));
    }
  };

  const handlePowerballClick = (number: number) => {
    setPowerball(powerball === number ? null : number);
  };

  const generateQuickPick = () => {
    const numbers: number[] = [];
    while (numbers.length < maxNumbers) {
      const num = Math.floor(Math.random() * maxMainNumber) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setSelectedNumbers(numbers.sort((a, b) => a - b));

    if (needsPowerball) {
      setPowerball(Math.floor(Math.random() * maxPowerball) + 1);
    }
  };

  const copyToClipboard = () => {
    const numbersText = selectedNumbers.join(", ");
    const powerballText = powerball ? ` + ${powerball}` : "";
    navigator.clipboard.writeText(
      `${gameName}: ${numbersText}${powerballText}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    if (
      selectedNumbers.length === maxNumbers &&
      (!needsPowerball || powerball)
    ) {
      onConfirm(selectedNumbers, powerball || undefined);
      onClose();
      setSelectedNumbers([]);
      setPowerball(null);
    }
  };

  const isComplete =
    selectedNumbers.length === maxNumbers && (!needsPowerball || powerball);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {gameName} Number Picker
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Numbers Display */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Your Numbers:</span>
              <div className="flex gap-1">
                {Array.from({ length: maxNumbers }, (_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                      selectedNumbers[i]
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {selectedNumbers[i] || "?"}
                  </div>
                ))}
                {needsPowerball && (
                  <>
                    <span className="mx-2 text-gray-400 self-center">+</span>
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                        powerball
                          ? "bg-red-500 text-white border-red-500"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {powerball || "?"}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <Button onClick={generateQuickPick} variant="outline" size="sm">
                <Shuffle className="h-4 w-4 mr-2" />
                Quick Pick
              </Button>
              {isComplete && (
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              )}
            </div>
          </div>

          {/* Main Numbers Grid */}
          <div>
            <h3 className="text-sm font-medium mb-3">
              Select {maxNumbers} numbers (1-{maxMainNumber}):
            </h3>
            <div className="grid grid-cols-10 gap-2 max-h-48 overflow-y-auto">
              {Array.from({ length: maxMainNumber }, (_, i) => i + 1).map(
                number => (
                  <Button
                    key={number}
                    variant={
                      selectedNumbers.includes(number) ? "default" : "outline"
                    }
                    size="sm"
                    className={`w-8 h-8 p-0 text-xs ${
                      selectedNumbers.includes(number)
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleNumberClick(number)}
                    disabled={
                      !selectedNumbers.includes(number) &&
                      selectedNumbers.length >= maxNumbers
                    }
                  >
                    {number}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Powerball/Mega Ball */}
          {needsPowerball && (
            <div>
              <h3 className="text-sm font-medium mb-3">
                Select{" "}
                {gameName.toLowerCase().includes("powerball")
                  ? "Powerball"
                  : "Mega Ball"}{" "}
                (1-{maxPowerball}):
              </h3>
              <div className="grid grid-cols-10 gap-2">
                {Array.from({ length: maxPowerball }, (_, i) => i + 1).map(
                  number => (
                    <Button
                      key={number}
                      variant={powerball === number ? "default" : "outline"}
                      size="sm"
                      className={`w-8 h-8 p-0 text-xs ${
                        powerball === number
                          ? "bg-red-500 hover:bg-red-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handlePowerballClick(number)}
                    >
                      {number}
                    </Button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!isComplete}
              className="bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600"
            >
              Add to Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
