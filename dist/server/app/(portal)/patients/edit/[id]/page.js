(()=>{var e={};e.id=425,e.ids=[425],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},48522:(e,s,a)=>{"use strict";a.r(s),a.d(s,{GlobalError:()=>r.a,__next_app__:()=>h,originalPathname:()=>x,pages:()=>d,routeModule:()=>m,tree:()=>o});var l=a(43739),n=a(65208),t=a(5313),r=a.n(t),i=a(54054),c={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>i[e]);a.d(s,c);let o=["",{children:["(portal)",{children:["patients",{children:["edit",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,29454)),"C:\\Users\\Alyson\\Desktop\\ucpip-v1\\frontend\\src\\app\\(portal)\\patients\\edit\\[id]\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,40766)),"C:\\Users\\Alyson\\Desktop\\ucpip-v1\\frontend\\src\\app\\(portal)\\patients\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,95985)),"C:\\Users\\Alyson\\Desktop\\ucpip-v1\\frontend\\src\\app\\(portal)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,7434,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,98059))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,74969)),"C:\\Users\\Alyson\\Desktop\\ucpip-v1\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,7434,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,98059))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\Alyson\\Desktop\\ucpip-v1\\frontend\\src\\app\\(portal)\\patients\\edit\\[id]\\page.tsx"],x="/(portal)/patients/edit/[id]/page",h={require:a,loadChunk:()=>Promise.resolve()},m=new l.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/(portal)/patients/edit/[id]/page",pathname:"/patients/edit/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},27259:(e,s,a)=>{Promise.resolve().then(a.bind(a,53355))},53355:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>b});var l=a(10439),n=a(11253),t=a(56924),r=a(37049),i=a(59816),c=a(93865),o=a(48449),d=a(76325),x=a(35280),h=a(28465),m=a(21526),p=a(16290),j=a(9023),u=a(48424),N=a(23057),f=a(34075),g=a(3708),v=a(72352);let y=async e=>{try{let s=await fetch(`https://ucpip-backend-production.up.railway.app/api/patient/${e}`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"});if(!s.ok)throw Error(`HTTP error! Status: ${s.status}`);let a=await s.json();return Array.isArray(a)?a[0]:a}catch(e){throw console.error("Error fetching patient data:",e),e}},w=({id:e})=>{let[s,a]=(0,m.useState)([]),[n,t]=(0,m.useState)(null),w=(0,h.cI)({resolver:(0,x.F)(p.Q),defaultValues:{first_name:"",last_name:"",sex:"male",contact:"",email:"",address:"",date_of_birth:"",student_id:"",department:"",height:"",weight:"",bmi:"",bmi_category:"",existing_medical_condition:"",maintenance_medication:"",allergies:"",vaccination_link:"",family_hx_of_illness:"",smoking:"No",drinking:"No",health_insurance:"",patient_category:"Normal",blood_type:"A+",action:"edit"}}),{control:b,setValue:_,watch:I,reset:C}=w,k=I("existing_medical_condition"),G=I("maintenance_medication"),A=I("family_hx_of_illness"),P=I("height"),z=I("weight");(0,m.useEffect)(()=>{let e=parseFloat(P??"0")/100,s=parseFloat(z??"0");if(e>0&&s>0){let a=parseFloat((s/(e*e)).toFixed(2)),l=(0,d.k)(a);_("bmi",a.toFixed(2)),_("bmi_category",l)}else _("bmi",""),_("bmi_category","")},[P,z,_]),(0,m.useEffect)(()=>{(async e=>{try{let s=await y(e);s&&(t(s),C(s))}catch(e){console.error("Error fetching patient:",e)}})(e)},[e,C]),(0,m.useEffect)(()=>{(async()=>{try{let e=await fetch("https://ucpip-backend-production.up.railway.app/api/departments",{method:"GET",credentials:"include"}),s=await e.json();a(s)}catch(e){console.error("Failed to fetch departments:",e)}})()},[]);let J=async e=>{let s={action:"edit",...e};try{let e=await fetch("https://ucpip-backend-production.up.railway.app/api/patient/save",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(s)}),a=await e.json();e.ok?u.Z.fire({icon:"success",title:"Success!",text:"Patient data has been updated successfully.",confirmButtonText:"OK"}):(console.error(a.message||"Update failed"),u.Z.fire({icon:"error",title:"Error!",text:a.message||"Update failed",confirmButtonText:"OK"}))}catch(e){alert("Failed to connect to the server")}},W=(e,s,a)=>""!==e.trim()||""!==s.trim()||""!==a.trim()?{category:"Alert",color:"text-red-500"}:{category:"Normal",color:"text-green-500"};return(0,m.useEffect)(()=>{let{category:e,color:s}=W(k??"",G??"",A??"");_("patient_category",e)},[k,G,A,_]),l.jsx(l.Fragment,{children:n?l.jsx(j.Zb,{className:"col-span-7 shadow-md p-6 bg-gray-200 ",children:l.jsx(i.l0,{...w,children:(0,l.jsxs)("form",{onSubmit:w.handleSubmit(J),className:"space-y-4 flex flex-col",children:[(0,l.jsxs)("div",{className:"flex flex-wrap w-full",children:[l.jsx(i.Wi,{control:w.control,name:"student_id",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Student ID"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px] m-2",placeholder:"Student ID"})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"first_name",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Firstname"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px] m-2",placeholder:"Firstname"})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"last_name",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Lastname"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px] m-2",placeholder:"Lastname"})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"sex",render:({field:e})=>(0,l.jsxs)(i.xJ,{className:"w-[150px] m-2",children:[l.jsx(i.lX,{className:"m-2",children:"Sex"}),l.jsx(i.NI,{children:(0,l.jsxs)(o.Ph,{value:e.value||"",onValueChange:s=>e.onChange(s),children:[l.jsx(o.i4,{children:l.jsx(o.ki,{placeholder:"Sex"})}),l.jsx(o.Bw,{children:p.Q.shape.sex.options.map(e=>l.jsx(o.Ql,{value:e,children:e},e.toLowerCase()))})]})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"contact",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Contact No."}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px]  m-2",placeholder:"Contact No."})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"email",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Email"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px]  m-2",placeholder:"Email"})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"address",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Home Address"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px]  m-2",placeholder:"Home Address"})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"date_of_birth",render:({field:e})=>(0,l.jsxs)(i.xJ,{className:"w-[150px]",children:[l.jsx(i.lX,{className:"m-2",children:"Birthdate"}),l.jsx(i.NI,{children:l.jsx("input",{type:"date",...e,id:e.name,className:(0,d.cn)("w-full pl-3 text-left font-normal",!e.value&&"text-muted-foreground"),onChange:s=>{e.onChange(s.target.value)}})}),l.jsx(i.zG,{})]})})]}),l.jsx("h3",{className:"text-xl font-semibold",children:"Department"}),l.jsx("div",{className:"flex flex-wrap w-full",children:l.jsx(i.Wi,{control:w.control,name:"department",render:({field:e})=>(0,l.jsxs)(i.xJ,{className:"w-[250px] m-2",children:[l.jsx(i.NI,{children:(0,l.jsxs)(o.Ph,{value:e.value||"",onValueChange:s=>e.onChange(s),children:[l.jsx(o.i4,{children:l.jsx(o.ki,{placeholder:"Select Department"})}),l.jsx(o.Bw,{children:s.map(e=>l.jsx(o.Ql,{value:e.id.toString(),children:e.name},e.id))})]})}),l.jsx(i.zG,{})]})})}),l.jsx("h3",{className:"text-xl font-semibold",children:"Statistics"}),(0,l.jsxs)("div",{className:"flex flex-wrap w-full",children:[l.jsx(i.Wi,{control:b,name:"height",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Height (cm)"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,type:"number",className:"w-[250px] m-2",placeholder:"Height (cm)",value:e.value??""})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:b,name:"weight",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Weight (kg)"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,type:"number",className:"w-[250px] m-2",placeholder:"Weight (kg)",value:e.value??""})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:b,name:"bmi",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"BMI"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,readOnly:!0,className:"w-[250px] m-2",placeholder:"BMI",value:e.value??""})}),l.jsx(i.zG,{})]})}),l.jsx("div",{children:l.jsx(i.Wi,{control:b,name:"bmi_category",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(N.pn,{children:(0,l.jsxs)(N.u,{children:[l.jsx(N.aJ,{asChild:!0,children:(0,l.jsxs)(i.lX,{className:"m-2 cursor-pointer relative group flex items-center space-x-2",children:[l.jsx("span",{children:"BMI Category"}),l.jsx(f.Z,{className:"text-gray-500 group-hover:text-blue-500 transition-colors duration-300",size:18}),l.jsx("span",{className:"absolute left-0 -bottom-1 w-1/2 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"})]})}),(0,l.jsxs)(N._v,{children:[l.jsx("p",{children:l.jsx("strong",{children:"BMI Chart:"})}),(0,l.jsxs)("ul",{children:[l.jsx("li",{className:"text-red-500",children:"Less than 18.5: Underweight"}),l.jsx("li",{className:"text-green-500",children:"18.5 to 24.9: Normal weight"}),l.jsx("li",{className:"text-yellow-500",children:"25.0 to 29.9: Overweight"}),l.jsx("li",{className:"text-orange-500",children:"30.0 to 34.9: Obesity (Class 1)"}),l.jsx("li",{className:"text-orange-700",children:"35.0 to 39.9: Obesity (Class 2)"}),l.jsx("li",{className:"text-red-700",children:"40.0 and above: Obesity (Class 3)"})]})]})]})}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px] m-2",placeholder:"BMI Category",value:e.value??"",readOnly:!0})}),l.jsx(i.zG,{})]})})})]}),l.jsx("h3",{className:"text-xl font-semibold",children:"Health Information"}),(0,l.jsxs)("div",{className:"flex flex-wrap w-full",children:[l.jsx(i.Wi,{control:w.control,name:"existing_medical_condition",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Existing Medical Condition"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px] m-2",placeholder:"Existing Medical Condition",value:e.value??""})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"maintenance_medication",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Maintenance Medication"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px] m-2",placeholder:"Maintenance Medication",value:e.value??""})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"allergies",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Allergies"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px] m-2",placeholder:"Allergies",value:e.value??""})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"vaccination_link",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Vaccination"}),l.jsx(i.NI,{children:l.jsx(g.g,{...e,className:"w-[250px] h-[100px] m-2",placeholder:"Vaccination",value:e.value??""})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"family_hx_of_illness",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Family Hx of illness"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px] m-2",placeholder:"Family Hx of illness",value:e.value??""})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"smoking",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Smoking"}),l.jsx(i.NI,{children:(0,l.jsxs)("div",{className:"flex items-center space-x-4 m-2",children:[(0,l.jsxs)("label",{className:"flex items-center space-x-2",children:[l.jsx("input",{type:"radio",value:"Yes",checked:"Yes"===e.value,onChange:()=>e.onChange("Yes"),className:"checkbox"}),l.jsx("span",{children:"Yes"})]}),(0,l.jsxs)("label",{className:"flex items-center space-x-2",children:[l.jsx("input",{type:"radio",value:"No",checked:"No"===e.value,onChange:()=>e.onChange("No"),className:"checkbox"}),l.jsx("span",{children:"No"})]})]})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"drinking",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Drinking"}),l.jsx(i.NI,{children:(0,l.jsxs)("div",{className:"flex items-center space-x-4 m-2",children:[(0,l.jsxs)("label",{className:"flex items-center space-x-2",children:[l.jsx("input",{type:"radio",value:"Yes",checked:"Yes"===e.value,onChange:()=>e.onChange("Yes"),className:"checkbox"}),l.jsx("span",{children:"Yes"})]}),(0,l.jsxs)("label",{className:"flex items-center space-x-2",children:[l.jsx("input",{type:"radio",value:"No",checked:"No"===e.value,onChange:()=>e.onChange("No"),className:"checkbox"}),l.jsx("span",{children:"No"})]})]})}),l.jsx(i.zG,{})]})}),l.jsx(i.Wi,{control:w.control,name:"health_insurance",render:({field:e})=>(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{className:"m-2",children:"Health Insurance"}),l.jsx(i.NI,{children:l.jsx(c.I,{...e,className:"w-[250px] m-2",placeholder:"Health Insurance",value:e.value??""})}),l.jsx(i.zG,{})]})})]}),l.jsx("h3",{className:"text-xl font-semibold",children:"Health Status"}),(0,l.jsxs)("div",{className:"flex flex-wrap w-full",children:[l.jsx(i.Wi,{control:b,name:"patient_category",render:({field:e})=>{let{category:s,color:a}=W(k??"",G??"",A??"");return(0,l.jsxs)(i.xJ,{children:[l.jsx(i.lX,{children:"Patient Category"}),l.jsx(i.NI,{children:l.jsx("div",{className:(0,d.cn)("font-bold",a),children:s})}),l.jsx(i.zG,{})]})}}),l.jsx(i.Wi,{control:w.control,name:"blood_type",render:({field:e})=>(0,l.jsxs)(i.xJ,{className:"w-[250px] m-2",children:[l.jsx(i.lX,{className:"m-2",children:"Blood Type"}),l.jsx(i.NI,{children:(0,l.jsxs)(o.Ph,{value:e.value||"",onValueChange:s=>e.onChange(s),children:[l.jsx(o.i4,{children:l.jsx(o.ki,{placeholder:"Select Blood Type"})}),l.jsx(o.Bw,{children:["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(e=>l.jsx(o.Ql,{value:e,children:e},e))})]})}),l.jsx(i.zG,{})]})})]}),(0,l.jsxs)("div",{className:"flex justify-center items-center space-x-4",children:[l.jsx(v.default,{href:"/patients",children:l.jsx(r.z,{children:"Back"})}),l.jsx(r.z,{className:"w-[200px]",type:"submit",children:"Save"})]})]})})}):l.jsx("div",{children:"Loading patient information..."})})},b=({params:e})=>{let s=e.id;return(0,l.jsxs)("section",{className:"bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto",children:[l.jsx(n.aG,{children:(0,l.jsxs)(n.Jb,{children:[l.jsx(n.gN,{children:l.jsx(n.At,{href:"/",children:"Portal"})}),l.jsx(n.bg,{}),l.jsx(n.gN,{children:(0,l.jsxs)(t.DropdownMenu,{children:[l.jsx(t.DropdownMenuTrigger,{className:"flex items-center gap-1",children:l.jsx(n.D5,{className:"h-4 w-4"})}),(0,l.jsxs)(t.DropdownMenuContent,{align:"start",children:[l.jsx(t.DropdownMenuItem,{children:l.jsx(n.At,{className:"w-full",href:"/dashboard",children:"Dashboard"})}),l.jsx(t.DropdownMenuItem,{children:l.jsx(n.At,{className:"w-full",href:"/admissions",children:"Admissions"})}),l.jsx(t.DropdownMenuItem,{children:l.jsx(n.At,{className:"w-full",href:"/patients",children:"Patients"})}),l.jsx(t.DropdownMenuItem,{children:l.jsx(n.At,{className:"w-full",href:"/administration",children:"Administration"})})]})]})}),l.jsx(n.bg,{}),l.jsx(n.gN,{children:l.jsx(n.At,{href:"/patients",children:"Patients"})}),l.jsx(n.bg,{}),l.jsx(n.gN,{children:l.jsx(n.At,{children:"Edit"})})]})}),l.jsx("div",{className:"flex",children:l.jsx("h1",{className:"text-xl font-semibold mr-5",children:"Edit Patient"})}),l.jsx("div",{className:"bg-white rounded shadow-md  w-full ",children:"string"==typeof s&&l.jsx(w,{id:s})})]})}},29454:(e,s,a)=>{"use strict";a.r(s),a.d(s,{$$typeof:()=>t,__esModule:()=>n,default:()=>r});let l=(0,a(49705).createProxy)(String.raw`C:\Users\Alyson\Desktop\ucpip-v1\frontend\src\app\(portal)\patients\edit\[id]\page.tsx`),{__esModule:n,$$typeof:t}=l,r=l.default}};var s=require("../../../../../webpack-runtime.js");s.C(e);var a=e=>s(s.s=e),l=s.X(0,[675,3195,8036,2336,2352,6367,9403,8889,9786,4004,5143,2867,2615,252,2376,8518,5027],()=>a(48522));module.exports=l})();