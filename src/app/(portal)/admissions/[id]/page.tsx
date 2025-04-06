"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PatientAdmissionSchema } from "@/types/patientAdmission";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Modify the schema for this page only
type ModifiedPatientAdmission = Omit<PatientAdmissionSchema, "vitalSigns" | "nurseNotes"> & {
  vital_signs: PatientAdmissionSchema["vitalSigns"]; // Replace vitalSigns with vital_signs
  nurse_notes: PatientAdmissionSchema["nurseNotes"]; // Replace nurseNotes with nurse_notes
};

const fetchPatientAdmissionData = async (id: string): Promise<ModifiedPatientAdmission> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient-admission/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
    });

    // Check for HTTP errors
    if (!response.ok) {
      const errorText = await response.text(); // Capture error message from response if any
      throw new Error(`Error fetching patient data: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // Parse the JSON response
    const data: ModifiedPatientAdmission[] = await response.json();

    // Check if the data exists and is in the expected format
    if (!data || data.length === 0) {
      throw new Error("No patient admission data found for the given ID");
    }

    return data[0]; // Assuming you want the first entry
  } catch (error) {
    // Provide more detailed error logging
    console.error(`Failed to fetch patient admission data for ID: ${id}`, error);
    throw error; // Re-throw to allow higher-level handling
  }
};

export default function PatientInformation({ params }: { params: { id: string } }) {
  const { id } = useParams();
  const [patient, setPatient] = useState<ModifiedPatientAdmission | null>(null);
  const patientId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const getPatient = async (patientId: string) => {
      try {
        const data = await fetchPatientAdmissionData(patientId); // Pass id directly
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (typeof patientId === "string") {
      getPatient(patientId);
    }
  }, [patientId]);

  // console.log(patient)

  return (
    <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Portal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/admissions">
                    Admissions
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/patients">
                    Patients
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/administration">
                    Administration
                  </BreadcrumbLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admissions">Admissions</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Patient Information</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-xl font-semibold">Admission Directory</h1>
      <div className="bg-gray-200 rounded  w-full p-4 space-y-4">
        <h1 className="text-xl font-semibold">Patient Personal Information</h1>

        <div className="flex flex-wrap gap-4">
          <div className="w-full max-w-[500px]">
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
              Student ID
            </label>
            <Input id="studentId" className="w-full mt-1" readOnly value={patient?.student_id || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              Fistname
            </label>
            <Input id="first_name" className="w-full mt-1" readOnly value={patient?.first_name || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Lastname
            </label>
            <Input id="last_name" className="w-full mt-1" readOnly value={patient?.last_name || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input id="email" className="w-full mt-1 uppercase" readOnly value={patient?.email || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
              Sex
            </label>
            <Input id="sex" className="w-full mt-1" readOnly value={patient?.sex || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <Input
              id="date_of_birth"
              className="w-full mt-1"
              readOnly
              value={new Date(patient?.date_of_birth || "").toLocaleDateString()}
            />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input id="address" className="w-full mt-1" readOnly value={patient?.address || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <Input id="contact" className="w-full mt-1" readOnly value={patient?.contact || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="department_name" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <Input id="department_name" className="w-full mt-1" readOnly value={patient?.department_name || ""} />
          </div>

          {/* <div className="w-full max-w-[500px]">
          <label htmlFor="cases" className="block text-sm font-medium text-gray-700">Cases</label>
          <Input id="cases" className="w-full mt-1" readOnly value={patient?.cases || ''} />
        </div>

        <div className="w-full max-w-[500px]">
          <label htmlFor="vitalSigns" className="block text-sm font-medium text-gray-700">Vital Signs</label>
          <Input id="vitalSigns" className="w-full mt-1" readOnly value={patient?.vital_signs || ''} />
        </div>

        <div className="w-full max-w-[500px]">
          <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">Prescription</label>
          <Input id="prescription" className="w-full mt-1" readOnly value={patient?.prescription || ''} />
        </div> */}

          <div className="w-full max-w-[500px]">
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
              Temperature
            </label>
            <Input id="temperature" className="w-full mt-1" readOnly value={patient?.temperature || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="pulse_rate" className="block text-sm font-medium text-gray-700">
              Pulse Rates
            </label>
            <Input id="pulse_rate" className="w-full mt-1" readOnly value={patient?.pulse_rate || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="respiratory_rate" className="block text-sm font-medium text-gray-700">
              Respiratory Rate
            </label>
            <Input id="respiratory_rate" className="w-full mt-1" readOnly value={patient?.respiratory_rate || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="nurseNotes" className="block text-sm font-medium text-gray-700">
              Nurse notes
            </label>
            <Input id="nurseNotes" className="w-full mt-1" readOnly value={patient?.nurse_notes || ""} />
          </div>

          {/* <div className="w-full max-w-[500px]">
          <label htmlFor="actions" className="block text-sm font-medium text-gray-700">Actions</label>
          <Input id="actions" className="w-full mt-1" readOnly value={patient?.actions || ''} />
        </div>

        <div className="w-full max-w-[500px]">
          <label htmlFor="reasons" className="block text-sm font-medium text-gray-700">Common Reasons</label>
          <Input id="reasons" className="w-full mt-1" readOnly value={patient?.common_reasons || ''} />
        </div>

        <div className="w-full max-w-[500px]">
          <label htmlFor="reasons" className="block text-sm font-medium text-gray-700">Other Reasons</label>
          <Input id="reasons" className="w-full mt-1" readOnly value={patient?.reasons || ''} />
        </div> */}

          <div className="w-full max-w-[500px]">
            <label htmlFor="blood_pressure" className="block text-sm font-medium text-gray-700">
              Blood Pressure
            </label>
            <Input id="blood_pressure" className="w-full mt-1" readOnly value={patient?.blood_pressure || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="oxygen_saturation" className="block text-sm font-medium text-gray-700">
              Oxygen Saturation
            </label>
            <Input id="oxygen_saturation" className="w-full mt-1" readOnly value={patient?.oxygen_saturation || ""} />
          </div>

          <div className="w-full max-w-[500px]">
            <label htmlFor="pain_scale" className="block text-sm font-medium text-gray-700">
              Pain Scale
            </label>
            <Input id="pain_scale" className="w-full mt-1" readOnly value={patient?.pain_scale || ""} />
          </div>
        </div>
      </div>
    </section>
  );
}
