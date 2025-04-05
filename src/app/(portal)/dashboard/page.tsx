"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BookCheck } from "lucide-react";
import Swal from "sweetalert2";

const data = {
  weekly: [
    {
      name: "Sun",
      min: 4000,
      max: 2400,
    },
    {
      name: "Mon",
      min: 3000,
      max: 1398,
    },
    {
      name: "Tue",
      min: 2000,
      max: 9800,
    },
    {
      name: "Wed",
      min: 2780,
      max: 3908,
    },
    {
      name: "Thu",
      min: 1890,
      max: 4800,
    },
    {
      name: "Fri",
      min: 2390,
      max: 3800,
    },
    {
      name: "Sat",
      min: 3490,
      max: 4300,
    },
  ],
  monthly: [
    {
      name: "Jan",
      value: 4000,
    },
    {
      name: "Feb",
      value: 3000,
    },
    {
      name: "Mar",
      value: 2000,
    },
    {
      name: "Apr",
      value: 2780,
    },
    {
      name: "May",
      value: 1890,
    },
    {
      name: "Jun",
      value: 2390,
    },
    {
      name: "Jul",
      value: 3490,
    },
    {
      name: "Aug",
      value: 4000,
    },
    {
      name: "Sep",
      value: 3000,
    },
    {
      name: "Oct",
      value: 2000,
    },
    {
      name: "Nov",
      value: 2780,
    },
    {
      name: "Dec",
      value: 1890,
    },
  ],
  recurring: [
    {
      name: "Dermatitis",
      x: 4000,
      y: 2400,
      z: 2400,
    },
    {
      name: "Asthma",
      x: 3000,
      y: 1398,
      z: 2210,
    },
    {
      name: "Hypertension",
      x: 2000,
      y: 9800,
      z: 2290,
    },
    {
      name: "Common Cold",
      x: 2780,
      y: 3908,
      z: 2000,
    },
  ],
};

interface PatientPerMonth {
  year: number;
  month: string;
  total: number;
}

interface PatientPerDayOfWeek {
  day: string;
  total: number;
}

interface VisitPerMonth {
  year: number;
  month: string;
  total: number;
}

interface VisittPerDayOfWeek {
  day: string;
  total: number;
}

interface Top10DaysWithMostPatient {
  date: string;
  total: number;
}

interface Top10CommonReason {
  reason: string;
  total: number;
}

interface DashboardTypes {
  overall_visit: number;
  overall_patient: number;
  patient_per_month: PatientPerMonth[];
  patient_per_day_of_week: PatientPerDayOfWeek[];
  top10_days_with_most_patient: Top10DaysWithMostPatient[];
  top10_common_reason: Top10CommonReason[];
  consultation_per_monthly: VisitPerMonth[];
  consultation_per_day_week: VisittPerDayOfWeek[];
}

const dashboardData = async (): Promise<DashboardTypes> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return response.json();
};

const Dashboard = () => {
  const [dashboardValues, setDashboardValues] = useState<DashboardTypes | null>(null);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const data = await dashboardData();
        setDashboardValues(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    getDashboardData();
  }, []);

  const patientPerMonth = dashboardValues?.patient_per_month?.map((item) => ({
    name: item.month.charAt(0).toUpperCase() + item.month.slice(1).toLowerCase(), // Capitalizes the month name
    value: item.total, // Maps the "total" to "value"
  }));

  const patientPerDay = dashboardValues?.patient_per_day_of_week?.map((item) => ({
    name: item.day.charAt(0).toUpperCase() + item.day.slice(1).toLowerCase(), // Capitalizes the month name
    value: item.total, // Maps the "total" to "value"
  }));

  const top10ChiefComplaint = dashboardValues?.top10_common_reason?.map((item) => ({
    name: item.reason.charAt(0).toUpperCase() + item.reason.slice(1).toLowerCase(), // Capitalizes the month name
    value: item.total, // Maps the "total" to "value"
  }));

  const top10DaysWithMostPatient = dashboardValues?.top10_days_with_most_patient?.map((item) => ({
    name: item.date.charAt(0).toUpperCase() + item.date.slice(1).toLowerCase(), // Capitalizes the month name
    value: item.total, // Maps the "total" to "value"
  }));

  const totalDailyPatients = patientPerDay?.reduce((sum, item) => sum + item.value, 0) || 0;
  const averageVisitsPerDay = patientPerDay?.length ? Math.round(totalDailyPatients / patientPerDay.length) : 0;

  const totalWeeklyPatients = patientPerDay?.reduce((sum, item) => sum + item.value, 0) || 0;
  const averageVisitsPerWeek = Math.round(totalWeeklyPatients / 7); // Divide by 7 for a week

  const visitPerMonth = dashboardValues?.consultation_per_monthly?.map((item) => ({
    name: item.month.charAt(0).toUpperCase() + item.month.slice(1).toLowerCase(), // Capitalizes the month name
    value: item.total, // Maps the "total" to "value"
  }));

  const visitPerDay = dashboardValues?.consultation_per_day_week?.map((item) => ({
    name: item.day.charAt(0).toUpperCase() + item.day.slice(1).toLowerCase(), // Capitalizes the month name
    value: item.total, // Maps the "total" to "value"
  }));

  const totalMonthlyPatients = patientPerMonth?.reduce((sum, item) => sum + item.value, 0) || 0;
  const averageVisitsPerMonth = patientPerMonth?.length ? Math.round(totalMonthlyPatients / patientPerMonth.length) : 0;

  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const pastYears = Array.from({ length: 11 }, (_, index) => currentYear - index); // Last 10 years + current year
    setYears(pastYears);
  }, []);

  const handleGenerateReport = async () => {
    // console.log("Selected Year:", selectedYear); // Logs the selected year
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/yearly-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ date: selectedYear }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const pdfFilename = `generated_${selectedYear}.pdf`;

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", pdfFilename);
        document.body.appendChild(link);
        link.click();

        link.parentNode?.removeChild(link);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "PDF downloaded successfully!",
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to generate report",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      alert("Failed to connect to the server");
    }
  };

  return (
    <>
      <section className="bg-gray-300 w-full flex-1 p-4 h-full overflow-y-auto space-y-4">
        <div className="flex items-center space-x-2">
          {/* Year Selector */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-32 px-3 py-2 border rounded-md shadow-sm text-gray-700 focus:ring focus:ring-indigo-300 focus:border-indigo-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Generate Report Button */}
          <Button
            onClick={handleGenerateReport}
            className="flex items-center gap-2  text-white font-semibold py-2 px-4 rounded-lg"
          >
            Generate Yearly Report
            <BookCheck className="ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-[#800000] text-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-semibold">Overall Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl ">{dashboardValues?.overall_visit || 0}</p>
            </CardContent>
          </Card>

          <Card className="bg-[#800000] text-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-semibold">Overall Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl ">{dashboardValues?.overall_patient || 0}</p>
            </CardContent>
          </Card>

          {/* // ########################### NEW ########################### */}

          <Card className="bg-[#800000] text-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-semibold">Average Visits per Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl">{averageVisitsPerDay}</p>
            </CardContent>
          </Card>

          <Card className="bg-[#800000] text-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-semibold">Average Visits Per Week</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl">{averageVisitsPerWeek}</p>
            </CardContent>
          </Card>

          <Card className="bg-[#800000] text-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-semibold">Average Visits per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl">{averageVisitsPerMonth}</p>
            </CardContent>
          </Card>

          {/* // ########################### NEW ########################### */}
        </div>
        {/* ####################################################################################################################### */}

        {/* <div className="grid grid-flow-col grid-cols-2 gap-4">
          <div className="inline-flex flex-col bg-white rounded shadow-md shadow-slate-600 p-2 gap-2">
            <h4 className="pl-2 text-xl font-bold">Number of Patients Per Month</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientPerMonth} className="text-sm">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#A9E3AE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="inline-flex flex-col bg-white rounded shadow-md shadow-slate-600 p-2 gap-2">
            <h4 className="pl-2 text-xl font-bold">Number of Patients Per Day</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientPerDay} className="text-sm">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#F17878" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        <div className="grid grid-flow-col grid-cols-2 gap-4">
          <div className="inline-flex flex-col bg-white rounded shadow-md shadow-slate-600 p-2 gap-2">
            <h4 className="pl-2 text-xl font-bold">Number of Visits Per Month</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitPerMonth} className="text-sm">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#A9E3AE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="inline-flex flex-col bg-white rounded shadow-md shadow-slate-600 p-2 gap-2">
            <h4 className="pl-2 text-xl font-bold">Number of Visits Per Day</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitPerDay} className="text-sm">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#F17878" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-flow-col grid-cols-2 gap-4">
          <div className="inline-flex flex-col bg-white rounded shadow-md shadow-slate-600 p-2 gap-2">
            <h4 className="pl-2 text-xl font-bold">Top 10 Patient Chief Complaint</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={top10ChiefComplaint} className="text-sm">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#F6E788" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="inline-flex flex-col bg-white rounded shadow-md shadow-slate-600 p-2 gap-2">
            <h4 className="pl-2 text-xl font-bold">Top 10 Days With Most Patient</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={top10DaysWithMostPatient} className="text-sm">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#17BDF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
