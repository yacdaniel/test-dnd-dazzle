CStudioAuthoring.Utils.addJavascript("/static-assets/yui/datasource/datasource-min.js");
CStudioAuthoring.Utils.addJavascript("/static-assets/yui/autocomplete/autocomplete.js");

CStudioForms.Datasources.Youtube = CStudioForms.Datasources.Youtube ||
    function(id, form, properties, constraints)  {
        this.id = id;
        this.form = form;
        this.properties = properties;
        this.constraints = constraints;

        return this;
    }

YAHOO.extend(CStudioForms.Datasources.Youtube, CStudioForms.CStudioFormDatasource, {

    getLabel: function() {
        return "Youtube"
    },

    add: function(control) {
        this._self = this;
		var site = CStudioAuthoringContext.site;
		var path = "/static-assets/images";
		var isUploadOverwrite = true;

	    for(var i=0; i<this.properties.length; i++) {
			if(this.properties[i].name == "repoPath") {
				path = this.properties[i].value;

				path = this.processPathsForMacros(path);
			}
		}

		var callback = {
			success: function(data) {
				if (control) {
					control.insertItem(data.key, data.value);
					control._renderItems();
                    control.decreaseFormDialog();
				}
			},
			failure: function() {
				insertCb.failure("An error occurred while uploading the image.");
			},
			context: this
		};

		var openFlickrDialogCb = {
			moduleLoaded: function(moduleName, dialogClass, moduleConfig) {
				dialogClass.showDialog(moduleConfig.site, moduleConfig.path, moduleConfig.callback, moduleConfig.isUploadOverwrite);
			}
		};

		var moduleConfig = {
			path: path,
			site: site,
			callback: callback,
			isUploadOverwrite: isUploadOverwrite
		}

		CStudioAuthoring.Module.requireModule("flickr-dialog", "/static-assets/components/cstudio-dialogs/upload-flickr-dialog.js", moduleConfig, openFlickrDialogCb);

    },

    showKeys: function() {
        var showKeys = false;
        var properties = this.properties;

        for(var i=0; i<properties.length; i++) {
            var prop = properties[i];

            if(prop.name == "showkeys") {
                if(prop.value && prop.value != "") {
                    showKeys = prop.value == 'true';
                    break;
                }
            }
        }

        return showKeys
    },

    getList: function(cb) {
        var value = [];
        var properties = this.properties;

        for(var i=0; i<properties.length; i++) {
            var prop = properties[i];

            if(prop.name == "options") {
                if(prop.value && prop.value != "") {
                    value = prop.value;
                    break;
                }
            }
        }

        if (cb != null && cb != undefined) {
            cb.success(eval(value));
        } else {
            return value;
        }
    },

    getInterface : function() {
        return "item";
    },

    /*
     * Datasource controllers don't have direct access to the properties controls, only to their properties and their values.
     * Because the property control (dropdown) and the dataType property share the property value, the dataType value must stay
     * as an array of objects where each object corresponds to each one of the options of the control. In order to know exactly
     * which of the options in the control is currently selected, we loop through all of the objects in the dataType value
     * and check their selected value.
     */
    getDataType : function getDataType () {
        var val = null;

        this.properties.forEach( function(prop) {
            if (prop.name == "dataType") {
                // return the value of the option currently selected
                var value = JSON.parse(prop.value);
                value.forEach( function(opt) {
                    if (opt.selected) {
                        val = opt.value;
                    }
                });
            }
        });
        return val;
    },

    getName: function() {
        return "youtube";
    },

    getSupportedProperties: function() {
        return [{
            label: CMgs.format(langBundle, "dataType"),
            name: "dataType",
            type: "dropdown",
            defaultValue: [{    // Update this array if the dropdown options need to be updated
                value: "value",
                label: "",
                selected: true
            }, {
                value: "value_s",
                label: CMgs.format(langBundle, "string"),
                selected: false
            }, {
                value: "value_i",
                label: CMgs.format(langBundle, "integer"),
                selected: false
            },{
                value: "value_f",
                label: CMgs.format(langBundle, "float"),
                selected: false
            },{
                value: "value_dt",
                label: CMgs.format(langBundle, "date"),
                selected: false
            },{
                value: "value_html",
                label: CMgs.format(langBundle, "HTML"),
                selected: false
            }]
        }, {
            label: CMgs.format(langBundle, "options"),
            name: "options",
            type: "keyValueMap"
        }, {
            label: CMgs.format(langBundle, "showKeys"),
            name: "showkeys",
            type: "boolean"
        }];
    },

    getSupportedConstraints: function() {
        return [
            { label: CMgs.format(langBundle, "required"), name: "required", type: "boolean" }
        ];
    }

});


CStudioAuthoring.Module.moduleLoaded("cstudio-forms-controls-youtube", CStudioForms.Datasources.Youtube);