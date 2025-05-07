"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const states = [
  { value: "ca", label: "California" },
  { value: "fl", label: "Florida" },
  { value: "ny", label: "New York" },
  { value: "tx", label: "Texas" },
  { value: "il", label: "Illinois" },
  { value: "pa", label: "Pennsylvania" },
  { value: "oh", label: "Ohio" },
  { value: "ga", label: "Georgia" },
  { value: "nc", label: "North Carolina" },
  { value: "mi", label: "Michigan" },
]

export default function StateSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("ca")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? states.find((state) => state.value === value)?.label : "Select state..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search state..." />
          <CommandList>
            <CommandEmpty>No state found.</CommandEmpty>
            <CommandGroup>
              {states.map((state) => (
                <CommandItem
                  key={state.value}
                  value={state.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === state.value ? "opacity-100" : "opacity-0")} />
                  {state.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
