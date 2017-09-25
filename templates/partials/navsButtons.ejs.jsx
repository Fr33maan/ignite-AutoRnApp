<% for (let nav of props.navs) { %>
        <RoundedButton 
          <% if(nav.param) { %>onPress={() => this.goTo<%- nav.name %>('<%- nav.param %>')} <% }
          else { %>onPress={this.goTo<%- nav.name %>}<% } %>
          text="<%- nav.name %>"
        /><% } %>