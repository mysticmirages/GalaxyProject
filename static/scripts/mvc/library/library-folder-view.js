define(["libs/toastr","mvc/library/library-model","mvc/ui/ui-select"],function(a,b,c){var d=Backbone.View.extend({el:"#center",model:null,options:{},events:{"click .toolbtn_save_permissions":"savePermissions"},initialize:function(a){this.options=_.extend(this.options,a),this.options.id&&this.fetchFolder()},fetchFolder:function(c){this.options=_.extend(this.options,c),this.model=new b.FolderAsModel({id:this.options.id});var d=this;this.model.fetch({success:function(){d.options.show_permissions?d.showPermissions():d.render()},error:function(b,c){"undefined"!=typeof c.responseJSON?a.error(c.responseJSON.err_msg+" Click this to go back.","",{onclick:function(){Galaxy.libraries.library_router.back()}}):a.error("An error ocurred. Click this to go back.","",{onclick:function(){Galaxy.libraries.library_router.back()}})}})},render:function(a){$(".tooltip").remove(),this.options=_.extend(this.options,a);var b=this.templateFolder();this.$el.html(b({item:this.model})),$(".peek").html(this.model.get("peek")),$("#center [data-toggle]").tooltip()},shareFolder:function(){a.info("Feature coming soon.")},goBack:function(){Galaxy.libraries.library_router.back()},showPermissions:function(b){this.options=_.extend(this.options,b),$(".tooltip").remove();var c=!1;Galaxy.currUser&&(c=Galaxy.currUser.isAdmin());var d=this.templateFolderPermissions();this.$el.html(d({folder:this.model,is_admin:c}));var e=this;void 0===this.options.fetched_permissions?$.get("/api/folders/"+e.id+"/permissions?scope=current").done(function(a){e.prepareSelectBoxes({fetched_permissions:a})}).fail(function(){a.error("An error occurred while attempting to fetch folder permissions.")}):this.prepareSelectBoxes({}),$("#center [data-toggle]").tooltip(),$("#center").css("overflow","auto")},_serializeRoles:function(a){for(var b=[],c=0;c<a.length;c++)b.push(a[c]+":"+a[c]);return b},prepareSelectBoxes:function(a){this.options=_.extend(this.options,a);var b=this.options.fetched_permissions,d=this,e=this._serializeRoles(b.add_library_item_role_list),f=this._serializeRoles(b.manage_folder_role_list),g=this._serializeRoles(b.modify_folder_role_list);d.addSelectObject=new c.View(this._createSelectOptions(this,"add_perm",e,!1)),d.manageSelectObject=new c.View(this._createSelectOptions(this,"manage_perm",f,!1)),d.modifySelectObject=new c.View(this._createSelectOptions(this,"modify_perm",g,!1))},_createSelectOptions:function(a,b,c){var d={minimumInputLength:0,css:b,multiple:!0,placeholder:"Click to select a role",container:a.$el.find("#"+b),ajax:{url:"/api/folders/"+a.id+"/permissions?scope=available",dataType:"json",quietMillis:100,data:function(a,b){return{q:a,page_limit:10,page:b}},results:function(a,b){var c=10*b<a.total;return{results:a.roles,more:c}}},formatResult:function(a){return a.name+" type: "+a.type},formatSelection:function(a){return a.name},initSelection:function(a,b){var c=[];$(a.val().split(",")).each(function(){var a=this.split(":");c.push({id:a[1],name:a[1]})}),b(c)},initialData:c.join(","),dropdownCssClass:"bigdrop"};return d},comingSoon:function(){a.warning("Feature coming soon.")},copyToClipboard:function(){var a=Backbone.history.location.href;-1!==a.lastIndexOf("/permissions")&&(a=a.substr(0,a.lastIndexOf("/permissions"))),window.prompt("Copy to clipboard: Ctrl+C, Enter",a)},_extractIds:function(a){ids_list=[];for(var b=a.length-1;b>=0;b--)ids_list.push(a[b].id);return ids_list},savePermissions:function(){var b=this,c=this._extractIds(this.addSelectObject.$el.select2("data")),d=this._extractIds(this.manageSelectObject.$el.select2("data")),e=this._extractIds(this.modifySelectObject.$el.select2("data"));$.post("/api/folders/"+b.id+"/permissions?action=set_permissions",{"add_ids[]":c,"manage_ids[]":d,"modify_ids[]":e}).done(function(c){b.showPermissions({fetched_permissions:c}),a.success("Permissions saved.")}).fail(function(){a.error("An error occurred while attempting to set folder permissions.")})},templateFolder:function(){var a=[];return a.push('<div class="library_style_container">'),a.push('  <div id="library_toolbar">'),a.push('   <button data-toggle="tooltip" data-placement="top" title="Modify library item" class="btn btn-default toolbtn_modify_dataset primary-button" type="button"><span class="fa fa-pencil"></span> Modify</span></button>'),a.push('   <a href="#folders/<%- item.get("folder_id") %>/datasets/<%- item.id %>/permissions"><button data-toggle="tooltip" data-placement="top" title="Manage permissions" class="btn btn-default toolbtn_change_permissions primary-button" type="button"><span class="fa fa-group"></span> Permissions</span></button></a>'),a.push('   <button data-toggle="tooltip" data-placement="top" title="Share dataset" class="btn btn-default toolbtn-share-dataset primary-button" type="button"><span class="fa fa-share"></span> Share</span></button>'),a.push("  </div>"),a.push("  <p>"),a.push("  This dataset is unrestricted so everybody can access it. Just share the URL of this page. "),a.push('  <button data-toggle="tooltip" data-placement="top" title="Copy to clipboard" class="btn btn-default btn-copy-link-to-clipboard primary-button" type="button"><span class="fa fa-clipboard"></span> To Clipboard</span></button> '),a.push("  </p>"),a.push('<div class="dataset_table">'),a.push('   <table class="grid table table-striped table-condensed">'),a.push("       <tr>"),a.push('           <th scope="row" id="id_row" data-id="<%= _.escape(item.get("ldda_id")) %>">Name</th>'),a.push('           <td><%= _.escape(item.get("name")) %></td>'),a.push("       </tr>"),a.push('   <% if (item.get("file_ext")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Data type</th>'),a.push('           <td><%= _.escape(item.get("file_ext")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push("    </table>"),a.push("</div>"),a.push("</div>"),_.template(a.join(""))},templateFolderPermissions:function(){var a=[];return a.push('<div class="library_style_container">'),a.push('  <div id="library_toolbar">'),a.push('   <a href="#/folders/<%= folder.get("parent_id") %>"><button data-toggle="tooltip" data-placement="top" title="Go back to the parent folder" class="btn btn-default primary-button" type="button"><span class="fa fa-caret-left fa-lg"></span> Parent folder</span></button></a>'),a.push("  </div>"),a.push('<h1>Folder: <%= _.escape(folder.get("name")) %></h1>'),a.push('<div class="alert alert-warning">'),a.push("<% if (is_admin) { %>"),a.push("You are logged in as an <strong>administrator</strong> therefore you can manage any folder on this Galaxy instance. Please make sure you understand the consequences."),a.push("<% } else { %>"),a.push("You can assign any number of roles to any of the following permission types. However please read carefully the implications of such actions."),a.push("<% }%>"),a.push("</div>"),a.push('<div class="dataset_table">'),a.push("<h2>Folder permissions</h2>"),a.push("<h4>Roles that can manage permissions on this folder</h4>"),a.push('<div id="manage_perm" class="manage_perm roles-selection"></div>'),a.push('<div class="alert alert-info roles-selection">User with <strong>any</strong> of these roles can manage permissions on this folder.</div>'),a.push("<h4>Roles that can add items to this folder</h4>"),a.push('<div id="add_perm" class="add_perm roles-selection"></div>'),a.push('<div class="alert alert-info roles-selection">User with <strong>any</strong> of these roles can add items to this folder (folders and datasets).</div>'),a.push("<h4>Roles that can modify this folder</h4>"),a.push('<div id="modify_perm" class="modify_perm roles-selection"></div>'),a.push('<div class="alert alert-info roles-selection">User with <strong>any</strong> of these roles can modify this folder (name, etc.).</div>'),a.push('<button data-toggle="tooltip" data-placement="top" title="Save modifications" class="btn btn-default toolbtn_save_permissions primary-button" type="button"><span class="fa fa-floppy-o"></span> Save</span></button>'),a.push("</div>"),a.push("</div>"),_.template(a.join(""))}});return{FolderView:d}});
//# sourceMappingURL=../../../maps/mvc/library/library-folder-view.js.map