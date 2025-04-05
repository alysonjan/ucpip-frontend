"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@/components/ui/table";
import { Eye, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PatientSchema } from "@/types/patient";
import { differenceInCalendarYears } from "date-fns";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PatientWithAge extends PatientSchema {
  student_id: string;
  age?: number;
  profile_photo?: string;
  department_name?: string;
}

interface PatientRecord {
  id: number;
  student_id: string;
  email?: string;
  cases?: string;
  vital_signs?: string;
  actions?: string;
  reasons?: string;
  prescription?: string;
  nurse_notes?: string;
  emas_on_duty?: string;
  timestamp?: string;
  services?: string; // "medical", "trauma", or "vaccination"

  // For medical service
  chief_complaint?: string;
  working_diagnosis?: string;
  signs_and_symptoms?: string;
  allergies?: string;
  case_type?: string; // Flexible type to allow for both string and number
  medication?: string;
  quantity?: string;
  past_medical_history?: string;
  assessment?: string;
  remarks?: string;
  reason_for_consultation?: string;

  // For physical exam service
  status?: string;
  physical_exam_remarks?: string;

  // For vaccination service
  vaccination_given?: string;
  dose_no?: string;
  purpose?: string;

  // medcert
  medcert_data?: string;
  medcert_remarks?: string;

  temperature?: string;
  pulse_rate?: string;
  respiratory_rate?: string;
  blood_pressure?: string;
  oxygen_saturation?: string;
  pain_scale?: string;
}

const fetchPatientData = async (id: string): Promise<PatientWithAge> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data[0];
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error; // Re-throw to be caught in useEffect
  }
};

const fetchPatientRecord = async (id: string): Promise<PatientRecord> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient-clinic-visit-log/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error; // Re-throw to be caught in useEffect
  }
};

export default function PatientInformation() {
  const { id } = useParams();
  const [patient, setPatient] = useState<PatientWithAge | null>(null);
  const patientId = Array.isArray(id) ? id[0] : id;
  const [patientRecord, setPatientRecord] = useState<PatientRecord[] | null>(null); // Array of PatientRecord

  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const getPatient = async (patientId: string) => {
      try {
        const data = await fetchPatientData(patientId); // Pass id directly
        const dataPatientRecord = await fetchPatientRecord(patientId); // Pass id directly
        // setPatientRecord(dataPatientRecord);
        setPatientRecord(Array.isArray(dataPatientRecord) ? dataPatientRecord : [dataPatientRecord]);

        setPatient({
          ...data,
          student_id: data.student_id, // Explicitly include student_id
          age: differenceInCalendarYears(Date.now(), new Date(data.date_of_birth)), // Calculate age
        });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (typeof patientId === "string") {
      getPatient(patientId);
    }

    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
      }
    };

    fetchDepartments();
  }, [patientId]);

  // console.log(patientRecord);

  return (
    <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
      <div className="flex ">
        <h1 className="text-xl font-semibold mr-5">Patient Info Directory</h1>
        {/* <Link href="/patients">
          <Button>Back</Button>
        </Link> */}
      </div>

      <div className="rounded shadow-md shadow-slate-600 w-full p-4 space-y-4 bg-gray-200">
        <div className="flex flex-row gap-4 w-full">
          <div className="w-1/4">
            <Card className="shadow-md">
              <CardHeader className="items-center uppercase font-bold text-xl">
                {patient?.first_name} {patient?.last_name}
              </CardHeader>
              <CardContent className="flex justify-center">
                {patient?.profile_photo ? (
                  <img
                    src={`/${patient?.profile_photo}`}
                    alt={`${patient?.first_name} ${patient?.last_name}`}
                    className="rounded-full"
                    style={{ width: "10rem", height: "10rem" }}
                  />
                ) : (
                  <UserRound size="10rem" className="rounded-full" />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="w-2/3 grid grid-cols-3 gap-4">
            {[
              {
                id: "studentId",
                label: "Student ID",
                value: patient?.student_id ? patient.student_id.replace(/(\w{2})(\w{4})(\w+)/, "$1-$2-$3") : "",
              },
              {
                id: "date_of_birth",
                label: "Date of Birth",
                value: patient?.date_of_birth ? new Date(patient?.date_of_birth).toLocaleDateString() : "",
              },
              { id: "age", label: "Age", value: patient?.age || "" },
              { id: "email", label: "Email", value: patient?.email || "" },
              { id: "sex", label: "Sex", value: patient?.sex?.toUpperCase() || "" },
              // { id: "department", label: "Department", value: patient?.department || "" },
              {
                id: "department",
                label: "Department",
                value: departments.find((dept) => dept.id.toString() === patient?.department)?.name || "Unknown",
              },
              { id: "address", label: "Address", value: patient?.address || "" },
              { id: "contact", label: "Contact", value: patient?.contact || "" },
              { id: "height", label: "Height", value: patient?.height || "" },
              { id: "weight", label: "Weight", value: patient?.weight || "" },
              { id: "bmi", label: "BMI", value: patient?.bmi || "" },
              { id: "bmiCategory", label: "BMI Category", value: patient?.bmi_category || "" },
              { id: "medicalCondition", label: "Medical Condition", value: patient?.existing_medical_condition || "" },
              { id: "medication", label: "Medication", value: patient?.maintenance_medication || "" },
              { id: "allergies", label: "Allergies", value: patient?.allergies || "" },
              { id: "vaccinationLink", label: "Vaccination", value: patient?.vaccination_link || "" },
              { id: "familyHistory", label: "Family History of Illness", value: patient?.family_hx_of_illness || "" },
              { id: "smoking", label: "Smoking", value: patient?.smoking || "" },
              { id: "drinking", label: "Drinking", value: patient?.drinking || "" },
              { id: "healthInsurance", label: "Health Insurance", value: patient?.health_insurance || "" },
              { id: "patientCategory", label: "Patient Category", value: patient?.patient_category || "" },
              { id: "bloodType", label: "Blood Type", value: patient?.blood_type || "" },
            ].map((field) => (
              <div key={field.id} className="w-full max-w-[500px]">
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <Input
                  id={field.id}
                  className={`w-full mt-1 border px-3 py-2 rounded-md ${
                    field.value ? "bg-white text-black" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } ${
                    field.id === "patientCategory" && field.value === "Alert"
                      ? "border-red-500 text-red-600"
                      : "border-gray-300"
                  } ${
                    field.id === "allergies" && field.value && field.value !== "None"
                      ? "border-red-500 text-red-600"
                      : ""
                  }`}
                  readOnly
                  value={field.value}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-[100%]">
            <Card className="shadow-md">
              <CardHeader className="items-center uppercase font-bold text-xl">
                <h2>Patient History</h2>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Table className="min-w-full border-collapse border border-gray-200">
                  <thead style={{ backgroundColor: "#02017D" }} className="text-white">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">DATE</th>
                      <th className="border border-gray-300 px-4 py-2">Time</th>
                      <th className="border border-gray-300 px-4 py-2">Service</th>
                      <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientRecord?.map((row: PatientRecord, index: number) => {
                      const date = row?.timestamp ? new Date(row?.timestamp).toLocaleDateString() : "N/A"; // Provide fallback for undefined timestamp
                      const time = row.timestamp ? new Date(row.timestamp).toLocaleTimeString() : "N/A";

                      return (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="text-center border border-gray-300 px-4 py-2">{date}</td>
                          <td className="text-center border border-gray-300 px-4 py-2">{time}</td>

                          <td className="text-center border border-gray-300 px-4 py-2">{row?.services || "N/A"}</td>
                          {/* Service Data */}
                          {/* Action Button for View */}
                          {/* Action Button for View */}
                          <td className="text-center border border-gray-300 px-4 py-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <div className="flex justify-center">
                                  <Button
                                    variant="default"
                                    className="flex gap-2 bg-gray-300 text-primary text-sm hover:bg-black/25"
                                  >
                                    <Eye size="1rem" />
                                    View Details
                                  </Button>
                                </div>
                              </DialogTrigger>

                              {/* Dialog Content with Patient Details */}
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Details</DialogTitle>
                                </DialogHeader>
                                <div className="p-4">
                                  {/* Conditional Rendering for Service Type */}
                                  {row?.services === "health_concern" && (
                                    <>
                                      <div className="mb-2">
                                        <strong>Temperature:</strong> <span>{row?.temperature || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Pulse Rate:</strong> <span>{row?.pulse_rate || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Respiratory Rate:</strong> <span>{row?.respiratory_rate || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Blood Pressure:</strong> <span>{row?.blood_pressure || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Oxygen Saturation:</strong>{" "}
                                        <span>{row?.oxygen_saturation || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Pain Scale:</strong> <span>{row?.pain_scale || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Nurse Notes:</strong> <span>{row?.nurse_notes || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Chief Complaint:</strong> <span>{row?.chief_complaint || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Working Diagnosis:</strong>{" "}
                                        <span>{row?.working_diagnosis || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Sign and Symptoms:</strong>{" "}
                                        <span>{row?.signs_and_symptoms || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Allergies:</strong> <span>{row?.allergies || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Case Type:</strong> <span>{row?.case_type || "N/A"}</span>
                                      </div>{" "}
                                      <div className="mb-2">
                                        <strong>Medication:</strong> <span>{row?.medication || "N/A"}</span>
                                      </div>{" "}
                                      <div className="mb-2">
                                        <strong>Quantity:</strong> <span>{row?.quantity || "N/A"}</span>
                                      </div>{" "}
                                      <div className="mb-2">
                                        <strong>Past Medical History:</strong>{" "}
                                        <span>{row?.past_medical_history || "N/A"}</span>
                                      </div>{" "}
                                      <div className="mb-2">
                                        <strong>Assessment:</strong> <span>{row?.assessment || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Remarks:</strong> <span>{row?.remarks || "N/A"}</span>
                                      </div>{" "}
                                      <div className="mb-2">
                                        <strong>Reason for Consultation:</strong>{" "}
                                        <span>{row?.reason_for_consultation || "N/A"}</span>
                                      </div>
                                    </>
                                  )}

                                  {row?.services === "physical_exam" && (
                                    <>
                                      <div className="mb-2">
                                        <strong>Temperature:</strong> <span>{row?.temperature || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Pulse Rate:</strong> <span>{row?.pulse_rate || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Respiratory Rate:</strong> <span>{row?.respiratory_rate || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Blood Pressure:</strong> <span>{row?.blood_pressure || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Oxygen Saturation:</strong>{" "}
                                        <span>{row?.oxygen_saturation || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Pain Scale:</strong> <span>{row?.pain_scale || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Nurse Notes:</strong> <span>{row?.nurse_notes || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Trauma Information:</strong> <span>{row?.status || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Remarks:</strong> <span>{row?.physical_exam_remarks || "N/A"}</span>
                                      </div>
                                    </>
                                  )}

                                  {row?.services === "vaccination" && (
                                    <>
                                      <div className="mb-2">
                                        <strong>Vaccination Given:</strong>{" "}
                                        <span>{row?.vaccination_given || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Dose Number:</strong> <span>{row?.dose_no || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Purpose of Vaccination:</strong> <span>{row?.purpose || "N/A"}</span>
                                      </div>
                                    </>
                                  )}

                                  {row?.services === "med_certificate" && (
                                    <>
                                      <div className="mb-2">
                                        <strong>Details:</strong> <span>{row?.medcert_data || "N/A"}</span>
                                      </div>
                                      <div className="mb-2">
                                        <strong>Remarks:</strong> <span>{row?.medcert_remarks || "N/A"}</span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
