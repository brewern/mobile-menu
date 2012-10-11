jQuery Mobile Menu Plugin
===========

Creates drawer-style navigation on your mobile site, as seen on iOS.

Basic Usage:
------------

`$("body").mobile_menu({ menu: 'main-nav' });`

Required Settings:
------------------

menu: Target the menu you would like to convert to mobile. This option supports multiple menus by using an array rather than string.

Optional Settings:
------------------

page_id: Sets the ID of the div that will wrap your sites content. Defaults to 'build-menu-page'

menu_width: Width of the mobile menu

menu_id: Menu ID. Defaults to 'mobile-nav'

button_content: The html content of your button. Defaults to a text string of 'MENU'

prepend_button_to: By default the button content is prepended to the page wrapper ID. This allows you to prepend the menu button within some other container.