(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),c=t.n(r),u=(t(19),t(2)),l=function(e){var n=e.newName,t=e.handleNameChange,a=e.handleNumberChange,r=e.newNumber,c=e.addPerson;return o.a.createElement("div",null,o.a.createElement("form",{onSubmit:c},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:n,onChange:t})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:r,onChange:a})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add"))))},i=t(3),m=t.n(i),s=function(){return m.a.get("/api/persons")},d=function(e){return m.a.post("/api/persons",e)},f=function(e){return m.a.delete("/api/persons/".concat(e))},h=function(e,n){return m.a.put("/api/persons/".concat(e),n)},p=function(e){var n=e.persons,t=e.newSearch,a=e.setPersons,r=e.setShowMessage;return o.a.createElement("div",null,n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e,n){return o.a.createElement("p",{key:e.name},e.name," ",e.number,o.a.createElement("button",{onClick:function(){window.confirm("Delete ".concat(e.name,"?"))&&f(e.id).then((function(n){s().then((function(n){a(n.data),r("Deleted ".concat(e.name))}))})),setTimeout((function(){r(null)}),1e3),console.log("deleted",{person:e})}}," delete "))})))},b=function(e){var n=e.newSearch,t=e.handleFiltering;return o.a.createElement("div",null,o.a.createElement("form",null,o.a.createElement("div",null,"manage filtering: ",o.a.createElement("input",{value:n,onChange:t}))))},E=function(e){var n=e.message;return null===n?null:o.a.createElement("p",{className:"error"},n)},g=function(){var e=Object(a.useState)([{name:"",number:""}]),n=Object(u.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),i=Object(u.a)(c,2),m=i[0],f=i[1],g=Object(a.useState)(""),v=Object(u.a)(g,2),w=v[0],N=v[1],S=Object(a.useState)(""),O=Object(u.a)(S,2),j=O[0],C=O[1],k=Object(a.useState)(null),y=Object(u.a)(k,2),T=y[0],P=y[1];Object(a.useEffect)((function(){console.log("effect"),s().then((function(e){console.log("loaded"),r(e.data)}))}),[]);return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(E,{message:T}),o.a.createElement(b,{newSearch:j,handleFiltering:function(e){C(e.target.value)}}),o.a.createElement("h2",null,"Add a new contact"),o.a.createElement(l,{newName:m,newNumber:w,setNewName:f,setNewNumber:N,addPerson:function(e){e.preventDefault(),console.log("button clicked",EventTarget);var n={name:m,number:w};t.some((function(e){return e.name===m&&e.number!==w}))?window.confirm("".concat(m," is already added to the phonebook, replace the number with a new one?"))&&h(t.filter((function(e){return e.name===m}))[0].id,n).then((function(e){s().then((function(e){r(e.data),P("Updated ".concat(m," 's number")),setTimeout((function(){P(null)}),1e3)}))})).catch((function(e){P("".concat(m," is already removed from the server!")),setTimeout((function(){P(null)}),1e3),r(t.filter((function(e){return e.name!==m})))})):t.some((function(e){return e.name===m}))?window.alert("".concat(m," is already added to phonebook")):d(n).then((function(e){r(t.concat(e.data)),f(""),N(""),P("Added ".concat(m)),setTimeout((function(){P(null)}),1e3)})).catch((function(e){P(JSON.stringify(e.response.data)),setTimeout((function(){P(null)}),2e3),console.log(e.response.data)}))},handleNumberChange:function(e){N(e.target.value)},handleNameChange:function(e){f(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(p,{persons:t,newSearch:j,setPersons:r,setShowMessage:P}))};c.a.render(o.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.46b7d0d0.chunk.js.map