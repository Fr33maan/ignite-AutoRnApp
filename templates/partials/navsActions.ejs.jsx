  <% for (let nav of props.navs) { %>
  goTo<%- nav.name %> = (<% if(nav.param){ %><%- nav.param %><% } %>) => {
    <% if(nav.type === 'nav') { %><%#
    %>this.props.parentProps.navigation.navigate('<%- nav.name %>'<% if(nav.param){ %>, {<%- nav.param %>}<% } %>)<%#
    %><% } else { %><%#
    %>this.props.parentProps.navigation.dispatch({type: 'OPEN_<%- nav.NAME %>_MODAL'<% if(nav.param){ %>, params: {<%- nav.param %>}<% } %>})<% } %>
  }
  <% } %>