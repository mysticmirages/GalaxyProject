define(["utils/utils","mvc/ui/ui-misc","mvc/tools/tools-form-base","mvc/tools/tools-jobs"],function(a,b,c,d){var e=c.extend({initialize:function(e){var f=this,g=new b.Button({icon:"fa-check",tooltip:"Execute: "+e.name,title:"Execute",cls:"btn btn-primary",floating:"clear",onclick:function(){g.wait(),f.form.portlet.disable(),d.submit(f.form,e,function(){g.unwait(),f.form.portlet.enable()})}});e.job_id&&e.job_remap&&(e.inputs.rerun_remap_job_id={label:"Resume dependencies from this job",name:"rerun_remap_job_id",type:"select",display:"radio",ignore:"__ignore__",value:"__ignore__",options:[["Yes",e.job_id],["No","__ignore__"]],help:"The previous run of this tool failed and other tools were waiting for it to finish successfully. Use this option to resume those tools using the new output(s) of this tool run."}),e=a.merge(e,{update_url:galaxy_config.root+"api/tools/"+e.id+"/build",buttons:{execute:g}}),c.prototype.initialize.call(this,e)}});return{View:e}});
//# sourceMappingURL=../../../maps/mvc/tools/tools-form.js.map