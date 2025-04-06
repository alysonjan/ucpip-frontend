"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { ChevronDown, User, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
interface UserInfo {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  contact_number: string;
}

const userProfileData = async (): Promise<UserInfo> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`, {
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

    return data?.profile;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error; // Re-throw to be caught in useEffect
  }
};

export default function UserProfile() {
  // const { id } = useParams();
  const [profileData, setProfileData] = useState<UserInfo | null>(null);
  const router = useRouter();

  // const [dropdownOpen, setDropdownOpen] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await userProfileData(); // Pass id directly
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    getProfile();
  }, []);

  // Logout handler
  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`, {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       localStorage.removeItem("fullname");
  //       localStorage.removeItem("role");
  //       router.push("/signin");
  //     } else {
  //       console.error("Failed to log out");
  //     }
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   }
  // };

  // // Toggle the dropdown visibility
  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  // Function to update the phone number
  const updatePhoneNumber = async () => {
    try {
      const userId = profileData?.id; // Assuming the user ID is in the profileData object
      if (!phoneNumber || !userId) {
        alert("Phone number or User ID is missing.");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-contact_number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ contact_number: phoneNumber, id: userId }),
      });

      if (response.ok) {
        // alert("Phone number updated successfully.");
        setIsEditing(false);
        window.location.reload();
      } else {
        alert("Failed to update phone number.");
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
      alert("An error occurred while updating the phone number.");
    }
  };

  return (
    <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
      <div className="flex items-center justify-between mt-10">
        <h1 className="text-xl font-semibold">User Profile</h1>
        {/* <Button className="flex items-center gap-2" onClick={handleLogout}>
          Logout <LogOut />
        </Button> */}
        {/* <div className="relative">
          <Button
            className="flex items-center gap-2"
            onClick={toggleDropdown}
          >
            <User className="w-6 h-6" /> {profileData?.firstname} {profileData?.lastname} <ChevronDown />
          </Button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border p-2 w-40">
              <button
                className="flex items-center gap-2 w-full text-gray-700 hover:bg-gray-300 rounded p-1"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div> */}
      </div>

      <div className="bg-gray-200 rounded shadow-md shadow-slate-600 w-full p-4 space-y-4">
        <h1 className="text-xl font-semibold">Information</h1>
        <section className="grid grid-flow-row grid-cols-8 gap-3">
          <Card className="col-span-7 shadow-md">
            <CardHeader>Personal Details</CardHeader>
            <CardContent>
              <Table>
                <tbody>
                  <tr>
                    <td>Email:</td>
                    <td>{profileData?.email}</td>
                  </tr>
                  <tr>
                    <td>Role:</td>
                    <td>{profileData?.role}</td>
                  </tr>
                  <tr>
                    <td>Contact Number:</td>
                    <td>
                      {!isEditing ? (
                        <>
                          <span>{profileData?.contact_number || "Not Provided"}</span>
                          <button onClick={() => setIsEditing(true)} className="text-blue-500 ml-2 hover:underline">
                            Update Phone Number
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="border rounded-md px-2 py-1"
                            placeholder="Enter phone number"
                          />
                          <button
                            onClick={updatePhoneNumber}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}
