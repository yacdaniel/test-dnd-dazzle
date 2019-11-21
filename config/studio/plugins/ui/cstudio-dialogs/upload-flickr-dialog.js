var YDom = YAHOO.util.Dom;
var YEvent = YAHOO.util.Event;

var cssEl = document.createElement("style");
cssEl.innerHTML = ".contentTypePopupInner { overflow-y: scroll !important; width: 800px !important; height: auto !important; padding: 16px; max-height: 300px; } .cr-li { list-style: none !important; padding:10px !important;  } .ui-menu-item > a { margin:10px; }"
document.body.appendChild(cssEl);
var mememe


CStudioAuthoring.Dialogs = CStudioAuthoring.Dialogs || {};

/**
 * Submit to go live
 */
CStudioAuthoring.Dialogs.UploadFlickrDialog = CStudioAuthoring.Dialogs.UploadFlickrDialog || {

	/**
	 * initialize module
	 */
	initialize: function(config) {

	},

	/**
	 * show dialog
	 */
	showDialog: function(site, path, callback, isUploadOverwrite) {
		this._self = this;
mememe = this;
		this.dialog = this.createDialog(path, site, isUploadOverwrite);

		this.site = site;
		this.path = path;
		this.asPopup = true;
		this.callback = callback;
		this.isUploadOverwrite = isUploadOverwrite;
		this.dialog.show();
		document.getElementById("cstudio-wcm-popup-div_h").style.display = "none";

	},

	/**
	 * hide dialog
	 */
    closeDialog:function() {
        this.dialog.destroy();
    },

    /**
	 * create dialog
	 */
	createDialog: function(path, site, callback, isUploadOverwrite) {
		var _self = this;
		this.callback = callback;

		YDom.removeClass("cstudio-wcm-popup-div", "yui-pe-content");

		if (isUploadOverwrite == "overwrite") {
			path = path.substring(0, path.lastIndexOf("/"));
		}

		var newdiv = YDom.get("cstudio-wcm-popup-div");
		if (newdiv == undefined) {
			newdiv = document.createElement("div");
			document.body.appendChild(newdiv);
		}

		var divIdName = "cstudio-wcm-popup-div";
		newdiv.setAttribute("id",divIdName);
		newdiv.className= "yui-pe-content";


        newdiv.innerHTML = '<div class="contentTypePopupInner" id="upload-popup-inner">' +
                           '<div class="contentTypePopupContent" id="contentTypePopupContent"> ' +
                           '<div class="contentTypePopupHeader">Youtube Keyword Search</div> ' +
                           '<div><div  id="gutter1"><label for="flikr_search">Keyword:</label>' +
                           '<input style="height: 20px; margin-left: 10px; width: 200px;" type="text" value="" id="flickr_search">' +
                           '<br/><br/><div style="list-style:none important; " id="flickr_results"></div></div>' +

                           '</div> ' +
                           '</div>';

		document.getElementById("upload-popup-inner").style.width = "550px";
		document.getElementById("upload-popup-inner").style.height = "265px";

		 // Instantiate the Dialog
		upload_dialog = new YAHOO.widget.Dialog("cstudio-wcm-popup-div",
								{ width : "560px",
								  height : "275px",
								  fixedcenter : true,
								  visible : false,
								  modal:true,
								  close:false,
								  constraintoviewport : true,
								  underlay:"none"
								});

		// Render the Dialog
		upload_dialog.render();

		YAHOO.util.Event.onAvailable('flickr_search', function() {

		    $("#flickr_search").autocomplete({
		    		source: "/api/dam/ytsearch.json",
		    		appendTo: "#flickr_results",
		    });

		    var ac_inst = $('#flickr_search' ).data( 'ui-autocomplete' ),
    			old_renderMenu = ac_inst._renderMenu;

				ac_inst._renderMenu = function( ul, items ) {
     				$( ul ).addClass( 'cr-li' )
     				old_renderMenu.call( this, ul, items )
				};

			$("#flickr_search").on( "autocompleteselect",
								function( event, ui ) {
									var data = { key: ui.item.value, value: ui.item.label}
									mememe.callback.success(data);
									mememe.closeDialog();
								});


		    ac_inst._renderItem = function (ul, item) {

        			return $("<li class='cr-li' style='list-style: none !important;'><img src='http://img.youtube.com/vi/"+item.value+"/0.jpg?rel=0' style='height:53px; width:150px;'></img></li>")
            		.data("item.autocomplete", item)
            		.append($("<a></a>").html(item.label))
            		.appendTo(ul);
            };

		});

		var eventParams = {
			self: this
		};


		return upload_dialog;
	}
};

CStudioAuthoring.Module.moduleLoaded("flickr-dialog", CStudioAuthoring.Dialogs.UploadFlickrDialog);