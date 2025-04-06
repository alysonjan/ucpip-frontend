(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4780],{59373:function(e,t,r){Promise.resolve().then(r.bind(r,70971))},78110:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(3527).Z)("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]])},83017:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(3527).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},28005:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(3527).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},70971:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return v}});var n=r(1443),s=r(97679),a=r(45250),l=r(35375),o=r(91690),i=r(94632),c=r(99616),d=r(78110),u=r(28005),f=r(83017),m=r(17954),x=r(50045),p=r.n(x),h=r(56079),g=r(57236),j=r(25843),b=r(81607),y=r(56345);function v(){let[e,t]=(0,m.useState)([]),[r,x]=(0,m.useState)(null),[v,N]=(0,m.useState)(!0),[w,C]=(0,m.useState)(""),[k,I]=(0,m.useState)({pageIndex:0,pageSize:7}),[R,z]=(0,m.useState)(null),[S,F]=(0,m.useState)(!1),[P,V]=(0,m.useState)(!1),[D,E]=(0,m.useState)(null),_=(0,g.cI)({resolver:(0,j.F)(b.a),defaultValues:r||{fullname:"",prc_license:""}});(0,m.useEffect)(()=>{(async()=>{try{let e=await fetch("".concat("https://ucpip-backend-production.up.railway.app","/api/doctors"),{method:"GET",credentials:"include"}),r=await e.json();t(r)}catch(e){console.error("Failed to fetch departments:",e)}finally{N(!1)}})(),_.reset(r||{fullname:"",prc_license:""})},[r,_]);let T=e=>{x({id:e.original.id,fullname:e.original.fullname,prc_license:e.original.prc_license}),F(!0)},O=()=>{x(null),V(!0)},M=e=>{var t;let r=null===(t=e.target.files)||void 0===t?void 0:t[0];r&&E(r)},B=async e=>{let t=r?"edit":"add";if("edit"===t){let n={action:t,id:null==r?void 0:r.id,...e};try{let e=await fetch("".concat("https://ucpip-backend-production.up.railway.app","/api/save-doctor"),{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(n)}),t=await e.json();e.ok?p().fire({icon:"success",title:"Updated",text:t.message,showConfirmButton:!1,timer:1e3,willClose:()=>{window.location.reload()}}):p().fire({icon:"error",title:"Error!",text:t.message||"Operation failed",confirmButtonText:"OK"})}catch(e){console.error("Error during ".concat(t,":"),e),alert("Failed to connect to the server")}}else if(D){let r=new FormData;r.append("action",t),r.append("fullname",e.fullname),r.append("prc_license",e.prc_license),r.append("signature",D);try{let e=await fetch("".concat("https://ucpip-backend-production.up.railway.app","/api/save-doctor"),{method:"POST",credentials:"include",body:r}),t=await e.json();e.ok?p().fire({icon:"success",title:"Created",text:t.message,showConfirmButton:!1,timer:1e3,willClose:()=>{window.location.reload()}}):p().fire({icon:"error",title:"Error!",text:t.message||"Operation failed",confirmButtonText:"OK"})}catch(e){console.error("Error during ".concat(t,":"),e),alert("Failed to connect to the server")}}},Z=e=>{p().fire({title:"Are you sure?",text:"Do you really want to delete this department?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",confirmButtonText:"Yes, delete it!"}).then(t=>{t.isConfirmed&&L(e)})},L=async e=>{z(null);try{let t=await fetch("".concat("https://ucpip-backend-production.up.railway.app","/api/delete-doctor"),{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({id:e})}),r=await t.json();t.ok?p().fire({icon:"success",title:"Success",text:"Doctor deleted successfully!",timer:1e3,showConfirmButton:!1,willClose:()=>{window.location.reload()}}):z(r.message||"Delete failed")}catch(e){z("Failed to connect to the server")}},G=(0,i.b7)({data:e,columns:[{accessorKey:"fullname",header:()=>(0,n.jsx)("div",{className:"text-center",children:"Full Name"}),cell:e=>{let{getValue:t}=e;return(0,n.jsx)("div",{className:"text-center",children:t()})}},{accessorKey:"prc_license",header:()=>(0,n.jsx)("div",{className:"text-center",children:"PRC License #"}),cell:e=>{let{getValue:t}=e;return(0,n.jsx)("div",{className:"text-center",children:t()})}},{accessorKey:"edit",header:()=>(0,n.jsx)("div",{className:"text-center",children:"Edit"}),cell:e=>{let{row:t}=e;return(0,n.jsx)("div",{className:"flex justify-center",children:(0,n.jsxs)(s.z,{variant:"outline",className:"flex items-center gap-2 text-white bg-green-800 hover:bg-green-700",onClick:()=>T(t),children:[(0,n.jsx)(d.Z,{size:"1rem"}),"EDIT"]})})}},{accessorKey:"delete",header:()=>(0,n.jsx)("div",{className:"text-center",children:"Delete"}),cell:e=>{let{row:t}=e;return(0,n.jsx)("div",{className:"flex justify-center",children:(0,n.jsxs)(s.z,{variant:"outline",className:"flex items-center gap-2 text-white bg-red-800 hover:bg-red-700",onClick:()=>Z(t.getValue("prc_license")),children:[(0,n.jsx)(u.Z,{size:"1rem"}),"DELETE"]})})}}],getCoreRowModel:(0,c.sC)(),getFilteredRowModel:(0,c.vL)(),getPaginationRowModel:(0,c.G_)(),state:{globalFilter:w,pagination:k},onGlobalFilterChange:C,onPaginationChange:I});return(0,n.jsxs)(n.Fragment,{children:[v?(0,n.jsx)("section",{className:"bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto",children:(0,n.jsx)("h1",{className:"text-xl font-semibold",children:"Loading doctors..."})}):(0,n.jsxs)("section",{className:"bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto",children:[(0,n.jsx)("h1",{className:"text-xl font-semibold",children:"Doctors"}),(0,n.jsx)("div",{className:"flex gap-2",children:(0,n.jsx)(a.I,{placeholder:"Filter patients…",value:w,onChange:e=>C(e.target.value),className:"max-w-sm"})}),(0,n.jsxs)("div",{className:"bg-white rounded shadow-md shadow-slate-600 w-full",children:[(0,n.jsxs)(l.iA,{children:[(0,n.jsx)(l.xD,{children:G.getHeaderGroups().map(e=>(0,n.jsx)(l.SC,{children:e.headers.map(e=>(0,n.jsx)(l.ss,{className:"bg-blue-500 text-white",children:e.isPlaceholder?null:(0,i.ie)(e.column.columnDef.header,e.getContext())},e.id))},e.id))}),(0,n.jsx)(l.RM,{children:G.getRowModel().rows.length?G.getRowModel().rows.map(e=>(0,n.jsx)(l.SC,{"data-state":e.getIsSelected()&&"selected",children:e.getVisibleCells().map(e=>(0,n.jsx)(l.pj,{children:(0,i.ie)(e.column.columnDef.cell,e.getContext())},e.id))},e.id)):(0,n.jsx)(l.SC,{children:(0,n.jsx)(l.pj,{colSpan:G.getVisibleFlatColumns().length,className:"h-24 text-center",children:"No results."})})})]}),(0,n.jsxs)("div",{className:"flex items-center justify-between mt-4 p-3",children:[(0,n.jsx)(s.z,{onClick:()=>I(e=>({...e,pageIndex:Math.max(0,e.pageIndex-1)})),disabled:0===k.pageIndex,className:"bg-gray-800 text-white ".concat(0===k.pageIndex?"cursor-not-allowed":"hover:bg-gray-700"," p-3"),children:"Previous"}),G.getPageCount()>1&&(0,n.jsxs)("span",{children:["Page ",k.pageIndex+1," of ",G.getPageCount()]}),(0,n.jsx)(s.z,{onClick:()=>I(e=>({...e,pageIndex:Math.min(G.getPageCount()-1,e.pageIndex+1)})),disabled:k.pageIndex>=G.getPageCount()-1,className:"bg-gray-800 text-white ".concat(k.pageIndex>=G.getPageCount()-1?"cursor-not-allowed":"hover:bg-gray-700"," p-3"),children:"Next"})]})]}),(0,n.jsx)("div",{className:"fixed bottom-6 right-6 space-y-4",children:(0,n.jsx)("div",{className:"relative group",children:(0,n.jsx)(h.pn,{children:(0,n.jsxs)(h.u,{children:[(0,n.jsx)(h.aJ,{asChild:!0,children:(0,n.jsx)(s.z,{className:"bg-[#800000] text-white w-12 h-12 rounded-full shadow-lg hover:bg-[#660000] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:ring-offset-2 flex items-center justify-center",style:{display:"flex",alignItems:"center",gap:"0.5rem"},onClick:()=>O(),children:(0,n.jsx)(f.Z,{})})}),(0,n.jsx)(h._v,{children:(0,n.jsx)("p",{children:"ADD"})})]})})})})]}),e&&(0,n.jsx)(o.Vq,{open:S,onOpenChange:F,children:(0,n.jsxs)(o.cZ,{children:[(0,n.jsxs)(o.fK,{children:[(0,n.jsx)(o.$N,{children:"Edit Doctor"}),(0,n.jsx)(o.Be,{children:"Doctor Details"})]}),(0,n.jsx)("div",{children:(0,n.jsx)(y.l0,{..._,children:(0,n.jsxs)("form",{onSubmit:_.handleSubmit(B),className:"space-y-4 flex flex-col w-full",children:[(0,n.jsx)(y.Wi,{control:_.control,name:"fullname",render:e=>{let{field:t}=e;return(0,n.jsxs)(y.xJ,{className:"w-full",children:[(0,n.jsxs)(y.lX,{className:"font-bold text-gray-600",children:["Fullname ",(0,n.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,n.jsx)(y.NI,{children:(0,n.jsx)(a.I,{...t,className:"w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500",placeholder:"Fullname"})}),(0,n.jsx)(y.zG,{})]})}}),(0,n.jsx)(y.Wi,{control:_.control,name:"prc_license",render:e=>{let{field:t}=e;return(0,n.jsxs)(y.xJ,{className:"w-full",children:[(0,n.jsxs)(y.lX,{className:"font-bold text-gray-600",children:["PRC License # ",(0,n.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,n.jsx)(y.NI,{children:(0,n.jsx)(a.I,{...t,className:"w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500",placeholder:"PRC License #"})}),(0,n.jsx)(y.zG,{})]})}}),(0,n.jsx)(s.z,{className:"mt-4",type:"submit",children:"Save"})]})})})]})}),(0,n.jsx)(o.Vq,{open:P,onOpenChange:V,children:(0,n.jsxs)(o.cZ,{children:[(0,n.jsxs)(o.fK,{children:[(0,n.jsx)(o.$N,{children:"Doctor"}),(0,n.jsx)(o.Be,{children:"Add new"})]}),(0,n.jsx)("div",{children:(0,n.jsx)(y.l0,{..._,children:(0,n.jsxs)("form",{onSubmit:_.handleSubmit(B),className:"space-y-4 flex flex-col w-full",children:[(0,n.jsx)(y.Wi,{control:_.control,name:"fullname",render:e=>{let{field:t}=e;return(0,n.jsxs)(y.xJ,{className:"w-full",children:[(0,n.jsxs)(y.lX,{className:"font-bold text-gray-600",children:["Fullname ",(0,n.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,n.jsx)(y.NI,{children:(0,n.jsx)(a.I,{...t,className:"w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500",placeholder:"Fullname"})}),(0,n.jsx)(y.zG,{})]})}}),(0,n.jsx)(y.Wi,{control:_.control,name:"prc_license",render:e=>{let{field:t}=e;return(0,n.jsxs)(y.xJ,{className:"w-full",children:[(0,n.jsxs)(y.lX,{className:"font-bold text-gray-600",children:["PRC License # ",(0,n.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,n.jsx)(y.NI,{children:(0,n.jsx)(a.I,{...t,className:"w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500",placeholder:"PRC License #"})}),(0,n.jsx)(y.zG,{})]})}}),(0,n.jsxs)("div",{className:"w-full",children:[(0,n.jsxs)("label",{className:"font-bold text-gray-600",children:["Signature ",(0,n.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,n.jsx)("input",{type:"file",accept:"image/*",onChange:e=>M(e),className:"w-full mt-2"})]}),(0,n.jsx)(s.z,{className:"mt-4",type:"submit",children:"Save"})]})})})]})})]})}},97679:function(e,t,r){"use strict";r.d(t,{d:function(){return i},z:function(){return c}});var n=r(1443),s=r(17954),a=r(73918),l=r(60707),o=r(17295);let i=(0,l.j)("inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/80",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-sm px-3",lg:"h-11 rounded-sm px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=s.forwardRef((e,t)=>{let{className:r,variant:s,size:l,asChild:c=!1,...d}=e,u=c?a.g7:"button";return(0,n.jsx)(u,{className:(0,o.cn)(i({variant:s,size:l,className:r})),ref:t,...d})});c.displayName="Button"},91690:function(e,t,r){"use strict";r.d(t,{$N:function(){return x},Be:function(){return p},Vq:function(){return i},cZ:function(){return f},fK:function(){return m},hg:function(){return c}});var n=r(1443),s=r(17954),a=r(39451),l=r(66634),o=r(17295);let i=a.fC,c=a.xz,d=a.h_;a.x8;let u=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)(a.aV,{ref:t,className:(0,o.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",r),...s})});u.displayName=a.aV.displayName;let f=s.forwardRef((e,t)=>{let{className:r,children:s,...i}=e;return(0,n.jsxs)(d,{children:[(0,n.jsx)(u,{}),(0,n.jsxs)(a.VY,{ref:t,className:(0,o.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",r),...i,children:[s,(0,n.jsxs)(a.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,n.jsx)(l.Z,{className:"h-4 w-4"}),(0,n.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});f.displayName=a.VY.displayName;let m=e=>{let{className:t,...r}=e;return(0,n.jsx)("div",{className:(0,o.cn)("flex flex-col space-y-1.5 text-center sm:text-left",t),...r})};m.displayName="DialogHeader";let x=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)(a.Dx,{ref:t,className:(0,o.cn)("text-lg font-semibold leading-none tracking-tight",r),...s})});x.displayName=a.Dx.displayName;let p=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)(a.dk,{ref:t,className:(0,o.cn)("text-sm text-muted-foreground",r),...s})});p.displayName=a.dk.displayName},56345:function(e,t,r){"use strict";r.d(t,{NI:function(){return h},Wi:function(){return u},l0:function(){return c},lX:function(){return p},pf:function(){return g},xJ:function(){return x},zG:function(){return j}});var n=r(1443),s=r(17954),a=r(73918),l=r(57236),o=r(17295),i=r(63714);let c=l.RV,d=s.createContext({}),u=e=>{let{...t}=e;return(0,n.jsx)(d.Provider,{value:{name:t.name},children:(0,n.jsx)(l.Qr,{...t})})},f=()=>{let e=s.useContext(d),t=s.useContext(m),{getFieldState:r,formState:n}=(0,l.Gc)(),a=r(e.name,n);if(!e)throw Error("useFormField should be used within <FormField>");let{id:o}=t;return{id:o,name:e.name,formItemId:"".concat(o,"-form-item"),formDescriptionId:"".concat(o,"-form-item-description"),formMessageId:"".concat(o,"-form-item-message"),...a}},m=s.createContext({}),x=s.forwardRef((e,t)=>{let{className:r,...a}=e,l=s.useId();return(0,n.jsx)(m.Provider,{value:{id:l},children:(0,n.jsx)("div",{ref:t,className:r,...a})})});x.displayName="FormItem";let p=s.forwardRef((e,t)=>{let{className:r,...s}=e,{error:a,formItemId:l}=f();return(0,n.jsx)(i.Label,{ref:t,className:(0,o.cn)(a&&"text-destructive",r),htmlFor:l,...s})});p.displayName="FormLabel";let h=s.forwardRef((e,t)=>{let{...r}=e,{error:s,formItemId:l,formDescriptionId:o,formMessageId:i}=f();return(0,n.jsx)(a.g7,{ref:t,id:l,"aria-describedby":s?"".concat(o," ").concat(i):"".concat(o),"aria-invalid":!!s,...r})});h.displayName="FormControl";let g=s.forwardRef((e,t)=>{let{className:r,...s}=e,{formDescriptionId:a}=f();return(0,n.jsx)("p",{ref:t,id:a,className:(0,o.cn)("text-sm text-muted-foreground",r),...s})});g.displayName="FormDescription";let j=s.forwardRef((e,t)=>{let{className:r,children:s,...a}=e,{error:l,formMessageId:i}=f(),c=l?String(null==l?void 0:l.message):s;return c?(0,n.jsx)("p",{ref:t,id:i,className:(0,o.cn)("text-sm font-medium text-destructive",r),...a,children:c}):null});j.displayName="FormMessage"},45250:function(e,t,r){"use strict";r.d(t,{I:function(){return l}});var n=r(1443),s=r(17954),a=r(17295);let l=s.forwardRef((e,t)=>{let{className:r,type:s,...l}=e;return(0,n.jsx)("input",{type:s,className:(0,a.cn)("flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...l})});l.displayName="Input"},63714:function(e,t,r){"use strict";r.r(t),r.d(t,{Label:function(){return c}});var n=r(1443),s=r(17954),a=r(12326),l=r(60707),o=r(17295);let i=(0,l.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)(a.f,{ref:t,className:(0,o.cn)(i(),r),...s})});c.displayName=a.f.displayName},35375:function(e,t,r){"use strict";r.d(t,{RM:function(){return i},SC:function(){return c},iA:function(){return l},pj:function(){return u},ss:function(){return d},xD:function(){return o}});var n=r(1443),s=r(17954),a=r(17295);let l=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("div",{className:"relative w-full overflow-auto",children:(0,n.jsx)("table",{ref:t,className:(0,a.cn)("w-full caption-bottom text-sm",r),...s})})});l.displayName="Table";let o=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("thead",{ref:t,className:(0,a.cn)("[&_tr]:border-b",r),...s})});o.displayName="TableHeader";let i=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("tbody",{ref:t,className:(0,a.cn)("[&_tr:last-child]:border-0",r),...s})});i.displayName="TableBody",s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("tfoot",{ref:t,className:(0,a.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",r),...s})}).displayName="TableFooter";let c=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("tr",{ref:t,className:(0,a.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",r),...s})});c.displayName="TableRow";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("th",{ref:t,className:(0,a.cn)("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",r),...s})});d.displayName="TableHead";let u=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("td",{ref:t,className:(0,a.cn)("p-4 align-middle [&:has([role=checkbox])]:pr-0",r),...s})});u.displayName="TableCell",s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("caption",{ref:t,className:(0,a.cn)("mt-4 text-sm text-muted-foreground",r),...s})}).displayName="TableCaption"},56079:function(e,t,r){"use strict";r.d(t,{_v:function(){return d},aJ:function(){return c},pn:function(){return o},u:function(){return i}});var n=r(1443),s=r(17954),a=r(20112),l=r(17295);let o=a.zt,i=a.fC,c=a.xz,d=s.forwardRef((e,t)=>{let{className:r,sideOffset:s=4,...o}=e;return(0,n.jsx)(a.VY,{ref:t,sideOffset:s,className:(0,l.cn)("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",r),...o})});d.displayName=a.VY.displayName},17295:function(e,t,r){"use strict";r.d(t,{cn:function(){return a},k:function(){return l}});var n=r(42784),s=r(26215);function a(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.m6)((0,n.W)(t))}function l(e){return e<18.5?"Underweight":e>=18.5&&e<25?"Normal weight":e>=25&&e<30?"Overweight":e>=30&&e<35?"Obesity Class I":e>=35&&e<40?"Obesity Class II":"Obesity Class III"}},81607:function(e,t,r){"use strict";r.d(t,{a:function(){return s}});var n=r(97378);let s=n.z.object({id:n.z.number().optional(),fullname:n.z.string().nonempty("This is required"),prc_license:n.z.string().nonempty("This is required")})},25843:function(e,t,r){"use strict";r.d(t,{F:function(){return c}});var n=r(57236),s=function(e,t,r){if(e&&"reportValidity"in e){var s=(0,n.U2)(r,t);e.setCustomValidity(s&&s.message||""),e.reportValidity()}},a=function(e,t){var r=function(r){var n=t.fields[r];n&&n.ref&&"reportValidity"in n.ref?s(n.ref,r,e):n.refs&&n.refs.forEach(function(t){return s(t,r,e)})};for(var n in t.fields)r(n)},l=function(e,t){t.shouldUseNativeValidation&&a(e,t);var r={};for(var s in e){var l=(0,n.U2)(t.fields,s),i=Object.assign(e[s]||{},{ref:l&&l.ref});if(o(t.names||Object.keys(e),s)){var c=Object.assign({},(0,n.U2)(r,s));(0,n.t8)(c,"root",i),(0,n.t8)(r,s,c)}else(0,n.t8)(r,s,i)}return r},o=function(e,t){return e.some(function(e){return e.startsWith(t+".")})},i=function(e,t){for(var r={};e.length;){var s=e[0],a=s.code,l=s.message,o=s.path.join(".");if(!r[o]){if("unionErrors"in s){var i=s.unionErrors[0].errors[0];r[o]={message:i.message,type:i.code}}else r[o]={message:l,type:a}}if("unionErrors"in s&&s.unionErrors.forEach(function(t){return t.errors.forEach(function(t){return e.push(t)})}),t){var c=r[o].types,d=c&&c[s.code];r[o]=(0,n.KN)(o,t,r,a,d?[].concat(d,s.message):s.message)}e.shift()}return r},c=function(e,t,r){return void 0===r&&(r={}),function(n,s,o){try{return Promise.resolve(function(s,l){try{var i=Promise.resolve(e["sync"===r.mode?"parse":"parseAsync"](n,t)).then(function(e){return o.shouldUseNativeValidation&&a({},o),{errors:{},values:r.raw?n:e}})}catch(e){return l(e)}return i&&i.then?i.then(void 0,l):i}(0,function(e){if(null!=e.errors)return{values:{},errors:l(i(e.errors,!o.shouldUseNativeValidation&&"all"===o.criteriaMode),o)};throw e}))}catch(e){return Promise.reject(e)}}}}},function(e){e.O(0,[7640,7333,8674,3859,5875,4632,112,1487,9878,323,1744],function(){return e(e.s=59373)}),_N_E=e.O()}]);