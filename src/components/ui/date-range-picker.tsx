"use client";

import { useState } from "react";
import { DateRange, Range } from "react-date-range";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Default theme CSS

const DateRangePicker: React.FC = () => {
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  return (
    <div className="flex flex-col space-y-2">
      {/* <label className="font-medium text-gray-700">Date-Created :</label> */}
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full text-left">
            {dateRange.startDate?.toLocaleDateString()} - {dateRange.endDate?.toLocaleDateString()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <DateRange
            ranges={[dateRange]}
            onChange={(range) => setDateRange(range.selection)}
            rangeColors={["#4f46e5"]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
