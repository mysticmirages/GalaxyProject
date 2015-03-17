define(["utils/utils","mvc/ui/ui-table","mvc/ui/ui-misc","mvc/ui/ui-portlet","mvc/form/form-repeat","mvc/form/form-input","mvc/form/form-parameters"],function(a,b,c,d,e,f,g){var h=Backbone.View.extend({initialize:function(a,c){this.app=a,this.inputs=c.inputs,c.cls="ui-table-plain",c.cls_tr="section-row",this.table=new b.View(c),this.parameters=new g(a,c),this.setElement(this.table.$el),this.render()},render:function(){this.table.delAll();for(var a in this.inputs)this.add(this.inputs[a])},add:function(b){var c=jQuery.extend(!0,{},b);c.id=b.id=a.uid(),this.app.input_list[c.id]=c;var d=c.type;switch(d){case"conditional":this._addConditional(c);break;case"repeat":this._addRepeat(c);break;case"section":this._addSection(c);break;default:this._addRow(c)}},_addConditional:function(a){var b=this;a.test_param.id=a.id;var c=this._addRow(a.test_param);c.options.onchange=function(c){var d=b.app.data.matchCase(a,c);for(var e in a.cases){var f=a.cases[e],g=a.id+"-section-"+e,h=b.table.get(g),i=!1;for(var j in f.inputs)if(!f.inputs[j].hidden){i=!0;break}e==d&&i?h.fadeIn("fast"):h.hide()}b.app.trigger("change")};for(var d in a.cases){var e=a.id+"-section-"+d,f=new h(this.app,{inputs:a.cases[d].inputs});f.$el.addClass("ui-table-section"),this.table.add(f.$el),this.table.append(e)}c.trigger("change")},_addRepeat:function(a){function b(b){var e=a.id+"-section-"+d++,f=new h(c.app,{inputs:b});g.add({id:e,$el:f.$el,ondel:function(){g.del(e),c.app.trigger("change")}})}for(var c=this,d=0,g=new e.View({title:a.title,title_new:a.title,min:a.min,max:a.max,onnew:function(){b(a.inputs),c.app.trigger("change")}}),i=a.min,j=_.size(a.cache),k=0;k<Math.max(j,i);k++){var l=null;l=j>k?a.cache[k]:a.inputs,b(l)}var m=new f(this.app,{label:a.title,help:a.help,field:g});this.table.add(m.$el),this.table.append(a.id)},_addSection:function(a){var b=this,e=new h(b.app,{inputs:a.inputs}),f=new c.ButtonIcon({icon:"fa-eye-slash",tooltip:"Show/hide section",cls:"ui-button-icon-plain"}),g=new d.View({title:a.label,cls:"ui-portlet-section",operations:{button_visible:f}});g.append(e.$el),g.append($("<div/>").addClass("ui-table-form-info").html(a.help));var i=!1;g.$content.hide(),g.$header.css("cursor","pointer"),g.$header.on("click",function(){i?(i=!1,g.$content.hide(),f.setIcon("fa-eye-slash")):(i=!0,g.$content.fadeIn("fast"),f.setIcon("fa-eye"))}),a.expand&&g.$header.trigger("click"),this.table.add(g.$el),this.table.append(a.id)},_addRow:function(a){var b=a.id,c=this.parameters.create(a);this.app.field_list[b]=c;var d=new f(this.app,{label:a.label,default_value:a.default_value,optional:a.optional,help:a.help,field:c});return this.app.element_list[b]=d,this.table.add(d.$el),this.table.append(b),a.hidden&&this.table.get(b).hide(),c}});return{View:h}});
//# sourceMappingURL=../../../maps/mvc/form/form-section.js.map