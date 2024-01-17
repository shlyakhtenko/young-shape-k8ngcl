"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[837],{3837:(e,l,a)=>{a.r(l),a.d(l,{default:()=>h});var n=a(2791),t=a(1282);function i(e){return[{name:"inputs",caption:"Input Column",query:e.name,fields:Object.entries(e.fields).map((e=>{let[l,a]=e;return{name:l,caption:a.caption,editable:a.editable,primary_key:a.primary_key,edit_type:a.edit_type,edit:!1,criteria:[[]],display_on_card:null,type:a.type}}))}]}function s(e,l,a){return{name:l,caption:a,query:e.name,fields:Object.entries(e.fields).map((e=>{let[l,a]=e;return{name:l,caption:a.caption,editable:a.editable,edit:!1,criteria:[[]],type:a.type,display_on_card:!0}}))}}function d(e,l,a,n){let t=[...new Set(l.map((e=>e.fields)).flat().filter((e=>e.edit)))].map((e=>e.name));console.log("compute_output: wip_fields = ",t,"query=",e);let i={name:a,caption:n,query:e.name,fields:Object.entries(e.fields).map((e=>{let[l,a]=e;return t.includes(l)||a.primary_key?{name:l,caption:a.caption,editable:a.editable,edit:!1,criteria:[[]],type:a.type,display_on_card:!0}:null})).filter((e=>null!=e))};return console.log("compute_outputs returning",i),i}var c=a(3360),r=a(184);const o=function(e){const l=e.siblings,a=e.setter,t=e.column_data,[i,s]=(0,n.useState)(e.local_fields?Object.keys(e.local_fields).length:0);return(0,r.jsxs)("div",{className:"column",children:[(0,r.jsxs)("label",{children:["Column:",(0,r.jsx)("input",{value:t.caption,onChange:e=>{let n=l.map((l=>l.name==t.name?{...t,caption:e.target.value}:l));a(n)}},"column_name")]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("table",{className:"fieldTable",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Field"}),e.use_field?(0,r.jsx)("th",{children:"Display?"}):"",e.edit_field?(0,r.jsx)("th",{children:"Edit?"}):"",(0,r.jsx)("th",{children:"Criteria"})]})}),(0,r.jsxs)("tbody",{children:[Object.entries(t.fields).map((n=>{let[,i]=n;return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:i.caption}),e.use_field?(0,r.jsx)("td",{children:(0,r.jsx)("input",{type:"checkbox",checked:i.display_on_card,onChange:e=>{let n=Object.entries(t.fields).map((l=>{let[,a]=l;return a.name==i.name?{...i,display_on_card:e.target.checked}:a})),s=l.map((e=>e.name==t.name?{...t,fields:n}:e));a(s)}},t.name+"_"+i.name+"_use")}):"",e.edit_field?(0,r.jsx)("td",{children:(0,r.jsx)("input",{type:"checkbox",checked:i.edit?1:0,disabled:!i.editable||i.primary_key,onChange:n=>{let s=Object.entries(t.fields).map((e=>{let[,l]=e;return l.name==i.name?{...i,edit:n.target.checked}:l})),d=l.map((e=>e.name==t.name?{...t,fields:s}:e));a(d),e.output_setter([])}},t.name+"_"+i.name+"_edit")}):"",[...i.criteria,[]].map(((e,n)=>(0,r.jsx)("td",{children:(0,r.jsx)("input",{onChange:e=>{let s=null;n!=Object.entries(i.criteria).length?s=Object.entries(t.fields).map((l=>{let[,a]=l;return a.name==i.name?{...i,criteria:i.criteria.map(((l,a)=>a!=n?l:[{op:e.target.value}]))}:a})):(console.log("got new criteria"),s=Object.entries(t.fields).map((l=>{let[,a]=l;return{...a,criteria:[...a.criteria,a.name==i.name?[{op:e.target.value}]:""]}}))),console.log("n=",n,s);let d=l.map((e=>e.name==t.name?{...t,fields:s}:e));console.log(d),a(d)},value:e[0]?e[0].op:""})},n)))]},"tr_"+i.name)})),(0,r.jsx)(r.Fragment,{children:e.local_fields?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("tr",{children:(0,r.jsx)("th",{className:"break",colSpan:3})}),(0,r.jsx)("tr",{children:(0,r.jsx)("th",{colSpan:3,className:"local_fields",children:(0,r.jsx)("h5",{children:(0,r.jsx)("b",{children:"Pipeline-only fields (not saved to PITS)"})})})}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Field"}),(0,r.jsx)("th",{children:"Field Type"}),(0,r.jsx)("th",{})]}),Object.entries(e.local_fields).map((l=>{let[a,n]=l;return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("input",{value:n.caption,className:"local_field_input",placeholder:"Field Name",onChange:l=>{var a,i;a=n.name,i=l.target.value,e.setter(e.siblings.map((e=>e.name==t.name?{...e,local_fields:{...e.local_fields,[a]:{...e.local_fields[a],caption:i}}}:e)))}})}),(0,r.jsx)("td",{children:(0,r.jsxs)("select",{value:n.edit_type,onChange:l=>{return a=n.name,i=l.target.value,void e.setter(e.siblings.map((e=>e.name==t.name?{...e,local_fields:{...e.local_fields,[a]:{...e.local_fields[a],edit_type:i}}}:e)));var a,i},children:[(0,r.jsx)("option",{value:"string",children:"Short text or Number"}),(0,r.jsx)("option",{value:"textarea",children:"Long text"}),(0,r.jsx)("option",{value:"select_yesno",children:"Yes/No"})]})}),(0,r.jsx)("td",{children:(0,r.jsx)(c.Z,{variant:"warning",size:"sm",onClick:()=>{e.setter(e.siblings.map((e=>{return e.name==t.name?{...e,local_fields:(l=n.name,a=e.local_fields,delete a[l],a)}:e;var l,a})))},children:"Delete"})})]},a)})),(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:3,className:"local_fields_add_button",children:(0,r.jsx)(c.Z,{onClick:()=>{console.log("add field","local_fields",e.local_fields,"siblings",e.siblings,"column name",t.name);let l=e.siblings.map((e=>e.name==t.name?{...e,local_fields:{...e.local_fields,["local_field"+i]:{caption:"",edit_type:"string",name:"local_field"+i,editable:!0,edit:!0}}}:e));s((e=>e+1)),console.log("siblings",e.siblings,"newsibligs",l),e.setter(e.siblings.map((l=>l.name==t.name?{...l,local_fields:{...l.local_fields,["local_field"+i+Object.entries(e.local_fields).length]:{caption:"",type:"string",name:"local_field"+i+Object.entries(e.local_fields).length,editable:!0,edit:!0}}}:l)))},children:"Add Field"})})})]}):null})]})]}),e.remove_button?(0,r.jsx)(c.Z,{onClick:()=>{let n=l.filter((l=>e.keep_column?(console.log("Datacolumn:","s.name=",l.name,"keep_column=",e.keep_column),l.name!=t.name||l.name==e.keep_column):l.name!=t.name));a(n)},children:"Delete Column"}):""]})]})};var p=a(2288),u=a(6638),m=a(7689);function h(e){let l=null;const a=(0,n.useContext)(t.O),[h,_]=(0,n.useState)([]),[j,x]=(0,n.useState)(null),[f,b]=(0,n.useState)([]),[g,v]=(0,n.useState)({}),[y,k]=(0,n.useState)([]),[C,S]=(0,n.useState)(!1),[N,w]=(0,n.useState)([]),[O,q]=(0,n.useState)([]),[Z,F]=(0,n.useState)(null);let D=null,P=null;if("new"!=e.pipeline){let e=(0,m.UO)();l=e.pipelineName,[D,P]=(0,n.useState)(l)}else l="Pipeline",[D,P]=(0,n.useState)("");const[T,I]=(0,n.useState)(l);return C||(()=>{const n="https://docs.ipam.ucla.edu/cocytus/get_data_sources.php?ipam_id="+a.ipam_id+"&session_token="+a.session_token;fetch(n,{mode:"cors",headers:{},method:"GET"}).then((a=>{a.json().then((a=>{console.log("pipeline_editor: got data",a);let n=null;"new"!=e.pipeline?(n=a.pipelines.find((e=>e.name==l)),console.log("pipeine editor: new_pipeline_data",n,"data.pipelines",a.pipelines,"looking for ",l)):n={name:"new",caption:"New Pipeline",data_source:a.data_sources[0].name,query:a.data_sources[0].available_queries[0].name,inputs:i(a.data_sources[0].available_queries[0]),local_fields:a.local_fields?a.local_fields:[]},F(n),_(a.data_sources);let t=a.data_sources.find((e=>e.name==n.data_source));console.log("new_data_source",t,"loaded=",C),x(t),v(t.available_queries.find((e=>e.name==n.inputs[0].query))),q(t.available_queries.map((e=>({value:e.name,label:e.caption})))),b(n.inputs),"new"!=e.pipeline?(k(n.wips),w(n.outputs),I(n.caption)):(I(""),k([]),w([])),S(!0)}))}))})(),(0,r.jsxs)("div",{className:"App",children:[(0,r.jsx)("nav",{children:(0,r.jsxs)(p.Z,{className:"Breadcrumb",children:[(0,r.jsx)(p.Z.Item,{href:"/malebolge/",children:"Home"}),(0,r.jsxs)(p.Z.Item,{active:!0,children:["Editing pipeline: ",T]})]})}),(0,r.jsx)("h1",{children:"Pipeline Editor"}),j&&Z?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("label",{className:"pipelineName",children:["Pipeline name:",(0,r.jsx)(u.Z.Control,{type:"text",value:T,onChange:e=>{I(e.target.value),P(encodeURIComponent(e.target.value))}})]}),(0,r.jsxs)("div",{className:"preamble",children:[(0,r.jsxs)("label",{children:["Datasource:",(0,r.jsx)(u.Z.Select,{className:"data_selector",defaultValue:j.name,onChange:e=>{let l=e.target.value,a=h.filter((e=>e.name==l))[0];x(a),b(i(a.available_queries[0])),k([]),w([]),q(a.available_queries.map((e=>({value:e.name,label:e.caption}))))},children:h.map((e=>(0,r.jsx)("option",{value:e.name,children:e.caption},e.name)))})]}),(0,r.jsxs)("label",{children:["Query:",(0,r.jsxs)(u.Z.Select,{className:"data_selector",defaultValue:g.name,onChange:e=>{let l=e.target.value,a=j.available_queries.filter((e=>e.name==l))[0];v(a),b(i(a)),k([]),w([])},children:[console.log(g),O.map((e=>(0,r.jsx)("option",{value:e.value,children:e.label},e.value)))]})]})]}),(0,r.jsxs)("table",{className:"columntable",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsxs)("th",{children:[(0,r.jsx)("h2",{children:"Inputs"}),(0,r.jsx)("h4",{children:"New cards appear here"})]}),(0,r.jsxs)("th",{children:[(0,r.jsxs)("h2",{children:["To-Do's"," ",(0,r.jsx)(c.Z,{onClick:()=>{k([...y,s(g,"wip"+y.length+1,"")])},children:"Add Column"})]}),(0,r.jsx)("h4",{children:"Cards you are working on appear here"})]}),(0,r.jsxs)("th",{children:[(0,r.jsxs)("h2",{children:["Done"," ",(0,r.jsx)(c.Z,{onClick:()=>{w([...N,d(g,y,"outputs"+N.length+1,"")])},children:"Add Column"})]}),(0,r.jsx)("h4",{children:"All cards should end up here"})]})]})}),(0,r.jsx)("tbody",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("div",{className:"columnset",children:(0,r.jsx)(o,{column_data:f[0],local_fields:f[0].local_fields?f[0].local_fields:{},siblings:f,setter:b,use_field:!0,edit_field:!1},"inputs")})}),(0,r.jsx)("td",{children:(0,r.jsx)("div",{className:"columnset",children:y.map((e=>(0,r.jsx)(o,{column_data:{...e,fields:e.fields},siblings:y,setter:k,remove_button:!0,output_setter:w,use_field:!1,edit_field:!0},e.name)))})}),(0,r.jsx)("td",{children:(0,r.jsx)("div",{className:"columnset",children:N.map((e=>(0,r.jsx)(o,{column_data:e,siblings:N,remove_button:!0,setter:w,use_field:!1,edit_field:!1},e.name)))})})]})})]}),(0,r.jsx)("hr",{}),(0,r.jsx)(c.Z,{disabled:0==N.length||""==T,onClick:()=>{let e={data_source:j.name,query:g.name,name:D,caption:T,inputs:f,wips:y,outputs:N,local_fields:Z.local_fields};const l={"Content-Type":"application/json"},n="https://docs.ipam.ucla.edu/cocytus/save_pipeline.php?ipam_id="+a.ipam_id+"&session_token="+a.session_token,t=JSON.stringify(e);console.log("saving pipline before fetch url=",n,"body=",t,"headers=",l),fetch(n,{headers:l,body:t,mode:"cors",method:"POST"}).then((e=>{e.text().then((e=>{alert("Saved. Got response: "+e)}))}))},children:"Save"}),(0,r.jsx)("hr",{})]}):(0,r.jsx)("div",{children:"Loading data sources..."})]})}}}]);
//# sourceMappingURL=837.aa21de78.chunk.js.map