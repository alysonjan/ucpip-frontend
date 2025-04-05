// "use client";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import { Patient, PatientSchema } from "@/types/patient";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format, parse } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import Swal from 'sweetalert2';

// export default function PatientForm() {
//   const form = useForm<Patient>({
//     defaultValues: {
//       student_id: '',
//       first_name: '',
//       last_name: '',
//       email: '',
//       sex: 'male',
//       address: '',
//       date_of_birth: '',
//       contact: '',
//       department: '',
//       action: 'add'
//     }, 
//   });

//   const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to handle error messages

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments`, {
//           method: 'GET',
//           credentials: 'include', 
//         }); 
//         const data = await response.json();
//         setDepartments(data);
//       } catch (error) {
//         console.error('Failed to fetch departments:', error);
//       }
//     };

//     fetchDepartments();
//   }, []);


//     // Handle form submission
//     const onSubmitPatient = async (formData: z.infer<typeof PatientSchema>) => {

//       console.log(formData)

//       // const { id, first_name, last_name, email, sex, address, date_of_birth, contact, department } = formData
//       // const updatedFormData = {
//       //   firstname : first_name,
//       //   lastname : last_name,
//       //   email,
//       //   studentID : id,
//       //   sex,
//       //   address,
//       //   dateOfBirth : date_of_birth,
//       //   contact,
//       //   department,
//       //   profile_photo: 'default-profile.png',
//       //   action : 'add'
//       // };

//       // setLoading(true);
//       // setErrorMessage(null);
//       // try {
//       //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient/save`, {
//       //     method: 'POST',
//       //     headers: {
//       //       'Content-Type': 'application/json',
//       //     },
//       //     credentials: 'include',
//       //     body: JSON.stringify(updatedFormData),
//       //   });
  
//       //   const result = await response.json();
        
//       //   if (response.ok) {
  
//       //     Swal.fire({
//       //       icon: 'success',
//       //       title: 'Success',
//       //       text: 'Patient added successfully!',
//       //       timer: 1000,
//       //       showConfirmButton: false, 
//       //       willClose: () => {
//       //         window.location.reload();
//       //       },
//       //     });
  
  
//       //   } else {
//       //     setErrorMessage(result.message || 'Login failed');
//       //   }
//       // } catch (error) {
//       //     setErrorMessage('Failed to connect to the server');
//       // } finally {
//       //     setLoading(false);
//       // }
//     };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmitPatient)} className="space-y-4 flex flex-col w-full h-full max-h-[60vh] overflow-auto scrollbar-hidden">

//         <FormField
//           control={form.control}
//           name="student_id"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>STUDENT ID</FormLabel>
//               <FormControl>
//                 <Input {...field} required />
//               </FormControl>
//               <FormDescription>Enter the patient&lsquo;s university-provided ID.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="first_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>First name</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormDescription>Enter the patient&lsquo;s first name.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="last_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Last name</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormDescription>Enter the patient&lsquo;s last name.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Address</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormDescription>Enter the patient&lsquo;s email address.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="sex"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Gender</FormLabel>
//               <FormControl>
//                 <Select
//                   value={field.value || ''}
//                   onValueChange={(value) => field.onChange(value)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sex" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {PatientSchema.shape.sex.options.map((option) => (
//                       <SelectItem key={option.toLowerCase()} value={option}>
//                         {option}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormDescription>Choose the patient&lsquo;s sex.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="address"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Address</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormDescription>Enter the patient&lsquo;s address.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="date_of_birth"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Date of Birth</FormLabel>
//               <Popover modal={true}>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant={"outline"}
//                       className={cn("w-full pl-3 text-left font-normal flex", !field.value && "text-muted-foreground")}
//                     >
//                       {field.value ? format(parse(field.value, "yyyy-MM-dd", new Date()), "P") : <span>Pick a date</span>}
//                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={field.value ? parse(field.value, "yyyy-MM-dd", new Date()) : undefined}
//                     onSelect={(date) => {
//                       if (date) {
//                         field.onChange(format(date, "yyyy-MM-dd"));
//                       }
//                     }}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormDescription>Select the patient&lsquo;s date of birth.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />


//         <FormField
//           control={form.control}
//           name="contact"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Contact Number</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormDescription>Enter the patient&lsquo;s contact.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="department"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>School Department</FormLabel>
//               <FormControl>
//                 <Select
//                   value={field.value || ''}
//                   onValueChange={(value) => field.onChange(value)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Department" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {departments.map(department => (
//                       <SelectItem key={department.id} value={department.id.toString()}>
//                         {department.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormDescription>Select the patient&lsquo;s school department.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}

//         <Button type="submit" disabled={loading}>
//           {loading ? 'Saving...' : 'Save'}
//         </Button>
//       </form>
//     </Form>

//   );
// }
