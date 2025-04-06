(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6533],{42628:function(e,r,t){Promise.resolve().then(t.bind(t,99977))},93038:function(e,r,t){"use strict";var n=t(63677);t.o(n,"useParams")&&t.d(r,{useParams:function(){return n.useParams}}),t.o(n,"usePathname")&&t.d(r,{usePathname:function(){return n.usePathname}}),t.o(n,"useRouter")&&t.d(r,{useRouter:function(){return n.useRouter}}),t.o(n,"useSearchParams")&&t.d(r,{useSearchParams:function(){return n.useSearchParams}})},99977:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return h}});var n=t(1443),s=t(97679),i=t(56345),o=t(45250),a=t(25843),u=t(57236),l=t(97378),c=t(17954),d=t(93038),f=t(50045),m=t.n(f);let p=l.z.object({email:l.z.string().email(),password:l.z.string(),confirm_password:l.z.string()});function h(){let e=(0,d.useRouter)(),[r,t]=(0,c.useState)(null),[l,f]=(0,c.useState)(!1),h=(0,u.cI)({resolver:(0,a.F)(p),defaultValues:{email:"",password:"",confirm_password:""}}),v=async r=>{f(!0),t(null);try{if(r.password!==r.confirm_password){t("Password must match!");return}let n=await fetch("".concat("https://ucpip-backend-production.up.railway.app","/api/create-password"),{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(r)}),s=await n.json();n.ok?(console.log("Login successful",s),m().fire({title:"Success!",text:"Password created successfully. Go to the login page?",icon:"success",showCancelButton:!0,confirmButtonText:"Go to Login"}).then(r=>{r.isConfirmed&&e.push("/signin")})):t(s.message||"Failed to create password")}catch(e){console.error("Error during password creation:",e),t("Failed to connect to the server")}finally{f(!1)}};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h1",{className:"text-3xl",children:"Create Password."}),r&&(0,n.jsx)("p",{className:"text-red-500",children:r}),(0,n.jsx)(i.l0,{...h,children:(0,n.jsxs)("form",{onSubmit:h.handleSubmit(v),className:"space-y-2 flex flex-col w-96",children:[(0,n.jsx)(i.Wi,{control:h.control,name:"email",render:e=>{let{field:r}=e;return(0,n.jsxs)(i.xJ,{children:[(0,n.jsx)(i.lX,{children:"Enter Email"}),(0,n.jsx)(i.NI,{children:(0,n.jsx)(o.I,{...r,value:r.value||""})}),(0,n.jsx)(i.pf,{children:"Enter your registered email address."}),(0,n.jsx)(i.zG,{})]})}}),(0,n.jsx)(i.Wi,{control:h.control,name:"password",render:e=>{let{field:r}=e;return(0,n.jsxs)(i.xJ,{children:[(0,n.jsx)(i.lX,{children:"Create Password"}),(0,n.jsx)(i.NI,{children:(0,n.jsx)(o.I,{...r,type:"password",value:r.value||""})}),(0,n.jsx)(i.pf,{children:"Enter your new password."}),(0,n.jsx)(i.zG,{})]})}}),(0,n.jsx)(i.Wi,{control:h.control,name:"confirm_password",render:e=>{let{field:r}=e;return(0,n.jsxs)(i.xJ,{children:[(0,n.jsx)(i.lX,{children:"Confirm Password"}),(0,n.jsx)(i.NI,{children:(0,n.jsx)(o.I,{...r,type:"password",value:r.value||""})}),(0,n.jsx)(i.pf,{children:"Confirm your new password."}),(0,n.jsx)(i.zG,{})]})}}),(0,n.jsx)(s.z,{className:"px-40",type:"submit",disabled:l,children:l?"Creating...":"Submit"})]})})]})}},97679:function(e,r,t){"use strict";t.d(r,{d:function(){return u},z:function(){return l}});var n=t(1443),s=t(17954),i=t(73918),o=t(60707),a=t(17295);let u=(0,o.j)("inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/80",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-sm px-3",lg:"h-11 rounded-sm px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),l=s.forwardRef((e,r)=>{let{className:t,variant:s,size:o,asChild:l=!1,...c}=e,d=l?i.g7:"button";return(0,n.jsx)(d,{className:(0,a.cn)(u({variant:s,size:o,className:t})),ref:r,...c})});l.displayName="Button"},56345:function(e,r,t){"use strict";t.d(r,{NI:function(){return v},Wi:function(){return d},l0:function(){return l},lX:function(){return h},pf:function(){return g},xJ:function(){return p},zG:function(){return x}});var n=t(1443),s=t(17954),i=t(73918),o=t(57236),a=t(17295),u=t(63714);let l=o.RV,c=s.createContext({}),d=e=>{let{...r}=e;return(0,n.jsx)(c.Provider,{value:{name:r.name},children:(0,n.jsx)(o.Qr,{...r})})},f=()=>{let e=s.useContext(c),r=s.useContext(m),{getFieldState:t,formState:n}=(0,o.Gc)(),i=t(e.name,n);if(!e)throw Error("useFormField should be used within <FormField>");let{id:a}=r;return{id:a,name:e.name,formItemId:"".concat(a,"-form-item"),formDescriptionId:"".concat(a,"-form-item-description"),formMessageId:"".concat(a,"-form-item-message"),...i}},m=s.createContext({}),p=s.forwardRef((e,r)=>{let{className:t,...i}=e,o=s.useId();return(0,n.jsx)(m.Provider,{value:{id:o},children:(0,n.jsx)("div",{ref:r,className:t,...i})})});p.displayName="FormItem";let h=s.forwardRef((e,r)=>{let{className:t,...s}=e,{error:i,formItemId:o}=f();return(0,n.jsx)(u.Label,{ref:r,className:(0,a.cn)(i&&"text-destructive",t),htmlFor:o,...s})});h.displayName="FormLabel";let v=s.forwardRef((e,r)=>{let{...t}=e,{error:s,formItemId:o,formDescriptionId:a,formMessageId:u}=f();return(0,n.jsx)(i.g7,{ref:r,id:o,"aria-describedby":s?"".concat(a," ").concat(u):"".concat(a),"aria-invalid":!!s,...t})});v.displayName="FormControl";let g=s.forwardRef((e,r)=>{let{className:t,...s}=e,{formDescriptionId:i}=f();return(0,n.jsx)("p",{ref:r,id:i,className:(0,a.cn)("text-sm text-muted-foreground",t),...s})});g.displayName="FormDescription";let x=s.forwardRef((e,r)=>{let{className:t,children:s,...i}=e,{error:o,formMessageId:u}=f(),l=o?String(null==o?void 0:o.message):s;return l?(0,n.jsx)("p",{ref:r,id:u,className:(0,a.cn)("text-sm font-medium text-destructive",t),...i,children:l}):null});x.displayName="FormMessage"},45250:function(e,r,t){"use strict";t.d(r,{I:function(){return o}});var n=t(1443),s=t(17954),i=t(17295);let o=s.forwardRef((e,r)=>{let{className:t,type:s,...o}=e;return(0,n.jsx)("input",{type:s,className:(0,i.cn)("flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",t),ref:r,...o})});o.displayName="Input"},63714:function(e,r,t){"use strict";t.r(r),t.d(r,{Label:function(){return l}});var n=t(1443),s=t(17954),i=t(12326),o=t(60707),a=t(17295);let u=(0,o.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),l=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)(i.f,{ref:r,className:(0,a.cn)(u(),t),...s})});l.displayName=i.f.displayName},17295:function(e,r,t){"use strict";t.d(r,{cn:function(){return i},k:function(){return o}});var n=t(42784),s=t(26215);function i(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,s.m6)((0,n.W)(r))}function o(e){return e<18.5?"Underweight":e>=18.5&&e<25?"Normal weight":e>=25&&e<30?"Overweight":e>=30&&e<35?"Obesity Class I":e>=35&&e<40?"Obesity Class II":"Obesity Class III"}},91447:function(e,r,t){"use strict";function n(){return(n=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}t.d(r,{Z:function(){return n}})},25843:function(e,r,t){"use strict";t.d(r,{F:function(){return l}});var n=t(57236),s=function(e,r,t){if(e&&"reportValidity"in e){var s=(0,n.U2)(t,r);e.setCustomValidity(s&&s.message||""),e.reportValidity()}},i=function(e,r){var t=function(t){var n=r.fields[t];n&&n.ref&&"reportValidity"in n.ref?s(n.ref,t,e):n.refs&&n.refs.forEach(function(r){return s(r,t,e)})};for(var n in r.fields)t(n)},o=function(e,r){r.shouldUseNativeValidation&&i(e,r);var t={};for(var s in e){var o=(0,n.U2)(r.fields,s),u=Object.assign(e[s]||{},{ref:o&&o.ref});if(a(r.names||Object.keys(e),s)){var l=Object.assign({},(0,n.U2)(t,s));(0,n.t8)(l,"root",u),(0,n.t8)(t,s,l)}else(0,n.t8)(t,s,u)}return t},a=function(e,r){return e.some(function(e){return e.startsWith(r+".")})},u=function(e,r){for(var t={};e.length;){var s=e[0],i=s.code,o=s.message,a=s.path.join(".");if(!t[a]){if("unionErrors"in s){var u=s.unionErrors[0].errors[0];t[a]={message:u.message,type:u.code}}else t[a]={message:o,type:i}}if("unionErrors"in s&&s.unionErrors.forEach(function(r){return r.errors.forEach(function(r){return e.push(r)})}),r){var l=t[a].types,c=l&&l[s.code];t[a]=(0,n.KN)(a,r,t,i,c?[].concat(c,s.message):s.message)}e.shift()}return t},l=function(e,r,t){return void 0===t&&(t={}),function(n,s,a){try{return Promise.resolve(function(s,o){try{var u=Promise.resolve(e["sync"===t.mode?"parse":"parseAsync"](n,r)).then(function(e){return a.shouldUseNativeValidation&&i({},a),{errors:{},values:t.raw?n:e}})}catch(e){return o(e)}return u&&u.then?u.then(void 0,o):u}(0,function(e){if(null!=e.errors)return{values:{},errors:o(u(e.errors,!a.shouldUseNativeValidation&&"all"===a.criteriaMode),a)};throw e}))}catch(e){return Promise.reject(e)}}}},26323:function(e,r,t){"use strict";t.d(r,{F:function(){return s},e:function(){return i}});var n=t(17954);function s(...e){return r=>e.forEach(e=>{"function"==typeof e?e(r):null!=e&&(e.current=r)})}function i(...e){return(0,n.useCallback)(s(...e),e)}},69059:function(e,r,t){"use strict";t.d(r,{WV:function(){return a},jH:function(){return u}});var n=t(91447),s=t(17954),i=t(77070),o=t(73918);let a=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,r)=>{let t=(0,s.forwardRef)((e,t)=>{let{asChild:i,...a}=e,u=i?o.g7:r;return(0,s.useEffect)(()=>{window[Symbol.for("radix-ui")]=!0},[]),(0,s.createElement)(u,(0,n.Z)({},a,{ref:t}))});return t.displayName=`Primitive.${r}`,{...e,[r]:t}},{});function u(e,r){e&&(0,i.flushSync)(()=>e.dispatchEvent(r))}},73918:function(e,r,t){"use strict";t.d(r,{g7:function(){return o}});var n=t(91447),s=t(17954),i=t(26323);let o=(0,s.forwardRef)((e,r)=>{let{children:t,...i}=e,o=s.Children.toArray(t),u=o.find(l);if(u){let e=u.props.children,t=o.map(r=>r!==u?r:s.Children.count(e)>1?s.Children.only(null):(0,s.isValidElement)(e)?e.props.children:null);return(0,s.createElement)(a,(0,n.Z)({},i,{ref:r}),(0,s.isValidElement)(e)?(0,s.cloneElement)(e,void 0,t):null)}return(0,s.createElement)(a,(0,n.Z)({},i,{ref:r}),t)});o.displayName="Slot";let a=(0,s.forwardRef)((e,r)=>{let{children:t,...n}=e;return(0,s.isValidElement)(t)?(0,s.cloneElement)(t,{...function(e,r){let t={...r};for(let n in r){let s=e[n],i=r[n];/^on[A-Z]/.test(n)?s&&i?t[n]=(...e)=>{i(...e),s(...e)}:s&&(t[n]=s):"style"===n?t[n]={...s,...i}:"className"===n&&(t[n]=[s,i].filter(Boolean).join(" "))}return{...e,...t}}(n,t.props),ref:r?(0,i.F)(r,t.ref):t.ref}):s.Children.count(t)>1?s.Children.only(null):null});a.displayName="SlotClone";let u=({children:e})=>(0,s.createElement)(s.Fragment,null,e);function l(e){return(0,s.isValidElement)(e)&&e.type===u}}},function(e){e.O(0,[7640,7333,5875,9878,323,1744],function(){return e(e.s=42628)}),_N_E=e.O()}]);