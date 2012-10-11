/* Mobile Menu jQuery Plugin
 *
 * Creates a side nav bar that mimics the native IOS nav slide drawer
 *
 * Author: Nick Brewer
 * Version: 0.2
 *
 * REQUIRES: jQuery
 * RECOMMENDATION: Use jQuery.Animate-Enhanced for CSS3 animate properties
 */

var mobileApp = mobileApp || {};

;(function(mobileApp,$){
  var MobileMenu = function(elem, options){
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  MobileMenu.prototype = {
    defaults: {
      page_id: 'build-menu-page',
      menu: '', // set as an array for multiple menus
      menu_width: 260,
      menu_id: "mobile-nav",
      button_content: 'MENU',
      prepend_button_to: ''
    },

    /*
     * Initiate app. Set Layout.
     *
     * @return this
     */
    init: function(){
      var _this = this;
      _this.config = $.extend({}, _this.defaults, _this.options);

      this.setLayout();

      return _this;
    },

    /*
     * Clone site navigation and set it as mobile nav, set Class on each new menu
     *
     * @return false if no menu option is provided
     */

    buildMenu: function(){
			var _this = this;
      _this.config = $.extend({}, _this.defaults, _this.options);
      var menu = _this.config.menu,
          mobile_menu = $("#build-menu"),
          menu_collection = [];

      // GET MENU AND BUILD MOBILE NAV
      if(menu){
        if($.isArray(menu)){
          $.each(menu, function(i){
            mobile_menu.append($("#"+this).clone().find("ul").addClass(_this.config.menu_id+"-"+i).parent().html());
            $("#"+this).hide();
          });
        } else {
          $("#"+menu).clone().addClass(_this.config.menu_id+"-0").removeAttr("id").prependTo(mobile_menu);
          $("#"+menu).hide();
        }
      } else {
        return false;
      }
    },

    /*
     * Set CSS for new layout.
     *
     * @return void
     */
    setCSS: function(){
      var _this = this;
      _this.config = $.extend({}, _this.defaults, _this.options);

      $("#build-menu-overlay").css({
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        "z-index": 99,
        background: "#000",
        opacity: 0.5,
        display: "none"
      });

      $("html,body").css("height","100%");

      $("#build-menu").css({
        width: _this.config.menu_width+"px",
        display: "block",
        padding: 0,
        position: "fixed",
        "z-index": 0,
        height: "100%"
      });

      $("<style />").appendTo("head").html('#'+_this.config.page_id+' { position: relative; min-height: 100% }');
      $("style").append('html.build-menu-open #'+_this.config.page_id+' { position: fixed; overflow: hidden; width: 100%; left: 0; top: 0; bottom: 0 }');
    },

    /*
     * Set Layout, Build Menu, Set CSS. Set event handler for menu.
     *
     * @return void
     */
    setLayout: function(){
			var _this = this;
      _this.config = $.extend({}, _this.defaults, _this.options);

      // If prepend_button_to is not set to something custom, then just prepend to the page setting
      if(_this.config.prepend_button_to == ''){
        var prepend_button_to = "#"+_this.config.page_id;
      } else {
        var prepend_button_to = _this.config.prepend_button_to;
      }

      // SET HTML FRAMEWORK
      _this.$elem.wrapInner('<div id="'+_this.config.page_id+'" />').find("#"+_this.config.page_id).before('<div id="build-menu" />');
      $(prepend_button_to).prepend('<a href="#" id="build-menu-button">'+_this.config.button_content+'</a>');
      $("#"+_this.config.page_id).prepend('<div id="build-menu-overlay" />');

      this.buildMenu();
      this.setCSS();

      // EVENT HANDLER FOR MENU BUTTON
      $("#build-menu-button, #build-menu-overlay").on("click", function(e){
      	e.preventDefault();
        var html = $("html");
        var page = $("#"+_this.config.page_id);
        var overlay = $("#build-menu-overlay");

      	if(html.hasClass("build-menu-open")){
      		html.removeClass("build-menu-open");
      		html.addClass("build-menu-close");

      		page.animate({
						left: "-="+_this.config.menu_width+"px"
					}, "slow");

          overlay.fadeTo("slow",0, function(){
            $(this).css("visibility", "hidden");
          });
      	} else {
      		html.addClass("build-menu-open");
      		html.removeClass("build-menu-close");

					page.animate({
						left: "+="+_this.config.menu_width+"px"
					}, "slow");

          overlay.css("visibility", "visible").fadeTo("slow",0.5);
      	}
      });
    }
  };

  MobileMenu.defaults = MobileMenu.prototype.defaults;

  $.fn.mobile_menu = function(options) {
    return this.each(function() {
      new MobileMenu(this, options).init();
    });
  };

  mobileApp.MobileMenu = MobileMenu;
})(mobileApp,jQuery);