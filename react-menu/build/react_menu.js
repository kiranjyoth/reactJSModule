/**
 * @file
 * Main JS file for react functionality.
 *
 */

(function ($) {

  Drupal.behaviors.react_menu = {
    attach: function (context) {

      // A div with some text in it
      var MenuItemBox = React.createClass({displayName: 'MenuItemBox',

      loadMenuItemsFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },

      getInitialState: function() {
        return {data: []};
      },

      componentDidMount: function() {
        this.loadMenuItemsFromServer();
        setInterval(this.loadMenuItemsFromServer, this.props.pollInterval);
      },

      render: function() {
          return (
            React.createElement("div", {className: "menuItemBox"}, 
              React.createElement("h3", null, React.createElement("b", null, "Check here!")), 
              React.createElement(MenuItemList, {data: this.state.data})
            )
          );
        }
      });

      var MenuItemList = React.createClass({displayName: 'MenuItemList',
        render: function() {
          var menuItemNodes = this.props.data.map(function (menuItem) {
            return (
              React.createElement(MenuItem, {name: menuItem.title, subject: menuItem.url}, 
                menuItem.title
              )
            );
          });
          return (
            React.createElement("div", {className: "menuItemList"}, 
              menuItemNodes
            )
          );
        }
      });

      var MenuItem = React.createClass({displayName: 'MenuItem',
        render: function() {
          return (
 React.createElement("div", {className: "menuItem"}, 
              React.createElement("a", {className: "menuItemAuthor","href":this.props.subject}, 
                this.props.name
            
              ), 
              
            )
          );
        }
      });

      // Render our reactComponent
      React.render(
        React.createElement(MenuItemBox, {url: "http://dev-api.sidgs.net:9002/samplejson", pollInterval: 2000}),
        document.getElementById('recent-menu-items')
      );

    }
  }

})(jQuery);