import { PatientSchema } from "@/types/patient";
import { createContext, FC, ReactNode, useContext, useState } from "react";

// Define the type for the context value
interface PatientContextType {
  selectedPatient: PatientSchema | undefined;
  setSelectedPatient: React.Dispatch<React.SetStateAction<PatientSchema | undefined>>;
  fetchPatientById: (id: string)=> Promise<PatientSchema>
}

// Create the context with a default value of `undefined`
const PatientContext = createContext<PatientContextType | undefined>(undefined);

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: FC<PatientProviderProps> = ({ children }) => {


  const [selectedPatient, setSelectedPatient] = useState<PatientSchema | undefined>();
  

  const fetchPatientById = async (id: string): Promise<PatientSchema> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      return data[0]



    } catch (error) {
      console.error('Error fetching patient data:', error);
      throw error; // Re-throw to be caught in useEffect
    }
  };
  




  return (
    <PatientContext.Provider value={{ selectedPatient, setSelectedPatient, fetchPatientById }}>
      {children}
    </PatientContext.Provider>
  );
};




export function usePatientContext() {
    const context = useContext(PatientContext);
  
    // Ensure the context is not undefined
    if (!context) {
      throw new Error("usePatientContext must be used within a PatientProvider");
    }
  
    return context;
  }