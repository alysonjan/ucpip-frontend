// <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full">
// {isMounted && (
//   <>
//     {isNewStudent ? (
//       <input
//         type="text"
//         placeholder="Enter new student ID"
//         onChange={(e) => form.setValue("student_id", e.target.value)} // Update form value on change
//         className="mt-2 w-full border rounded p-2"
//       />
//     ) : (
//       <FormField
//         control={control}
//         name="student_id"
//         render={({ field }) => (
//           <SelectComponent
//             {...field}
//             options={studentOptions}
//             placeholder="Select Student ID"
//             onChange={(selectedOption) => {
//               field.onChange(selectedOption);
//               handleStudentChange(selectedOption);
//             }}
//             isClearable
//             noOptionsMessage={() => (
//               <div
//                 onClick={() => {
//                   const newOption = {
//                     value: "insert_new",
//                     label: "Insert new student?",
//                     student_id: "",
//                     first_name: "",
//                     last_name: "",
//                     email: "",
//                     sex: "male" as "male" | "female",
//                     address: "",
//                     date_of_birth: "",
//                     contact: "",
//                     department: "",
//                   };
//                   field.onChange(newOption);
//                   handleStudentChange(newOption); // Clear existing fields
//                 }}
//                 style={{ cursor: "pointer", color: "blue" }}
//               >
//                 Insert new student?
//               </div>
//             )}
//           />
//         )}
//       />
//     )}
//   </>
// )}
// <div className="flex flex-row gap-4">
//   <FormField
//     control={form.control}
//     name="student_id"
//     render={({ field }) => <input type="hidden" {...field} />}
//   />
//   <FormField
//     control={form.control}
//     name="first_name"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Input {...field} className="w-[250px]" placeholder="Firstname" />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="last_name"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Input {...field} className="w-[250px]" placeholder="Lastname" />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="email"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Input {...field} className="w-[250px]" placeholder="Email" />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="sex"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Sex" />
//             </SelectTrigger>
//             <SelectContent>
//               {patientAdmissionSchema.shape.sex.options.map((option) => (
//                 <SelectItem key={option.toLowerCase()} value={option}>
//                   {option}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="date_of_birth"
//     render={({ field }) => (
//       <FormItem className="w-[150px]">
//         <label htmlFor={field.name} className="mb-1 block text-xs font-medium text-gray-700">
//           Birthdate
//         </label>
//         <FormControl>
//           <input
//             type="date"
//             {...field}
//             id={field.name} // Link the label to the input
//             className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
//             onChange={(e) => {
//               field.onChange(e.target.value); // Update the value with the date string
//             }}
//           />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// </div>
// <div className="flex flex-row gap-4">
//   <FormField
//     control={form.control}
//     name="address"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Input {...field} className="w-[250px]" placeholder="Home Address" />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="contact"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Input {...field} className="w-[250px]" placeholder="Contact Number" />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="department"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Department" />
//             </SelectTrigger>
//             <SelectContent>
//               {departments.map((department) => (
//                 <SelectItem key={department.id} value={department.id.toString()}>
//                   {department.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// </div>
// <div className="flex flex-row gap-4">
//   <FormField
//     control={form.control}
//     name="cases"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Textarea {...field} className="w-[250px]" placeholder="Cases" rows={5} />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="vitalSigns"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Textarea {...field} className="w-[250px]" placeholder="Vital Signs" rows={5} />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="prescription"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Textarea {...field} className="w-[250px]" placeholder="Prescription" rows={5} />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="nurseNotes"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Textarea {...field} className="w-[250px]" placeholder="Nurse notes" rows={5} />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// </div>
// <div className="flex flex-row gap-4">
//   <FormField
//     control={form.control}
//     name="actions"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Textarea {...field} className="w-[250px]" placeholder="Actions" rows={5} />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="common_reasons"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Reason" />
//             </SelectTrigger>
//             <SelectContent>
//               {commonIllnesses.map((illness, index) => (
//                 <SelectItem key={index} value={illness}>
//                   {illness}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//   <FormField
//     control={form.control}
//     name="reasons"
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Textarea {...field} className="w-[250px]" placeholder="Other Reasons (Optional)" rows={5} />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// </div>
// <div className="flex justify-center">
//   <Button type="submit" className="w-full max-w-[200px]">
//     Submit
//   </Button>
// </div>
// </form>
