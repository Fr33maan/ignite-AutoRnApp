<Form model="<%- formAction.name %>Form" onSubmit={<%- formAction.name %>}>
          <% for (let argName of formAction.args) { %><%#
            %><Control.TextInput
              model=".<%- argName %>"
              placeholder="<%- argName %>"
              <%if(argName === 'password') { %>secureTextEntry={true}
              <% } %><%#
            %>validators={{
                isRequired: validators.isRequired('<%- argName %>').fn,
                <% if(argName === 'email')    { %>isEmail: validators.isEmail('<%- argName %>').fn,<% }
                   if(argName === 'password') { %>minLength: validators.minLength('<%- argName %>', 6).fn,<% } %>
              }}
          />
          <Errors
              model="<%- formAction.name %>Form.<%- argName %>"
              show={{submitFailed: true}}
              messages={{
                isRequired: validators.isRequired('<%- argName %>').msg,
                <% if(argName === 'email')    { %>isEmail: validators.isEmail('<%- argName %>').msg,<% }
                   if(argName === 'password') { %>minLength: validators.minLength('<%- argName %>', 6).msg,<% } %>
              }}
          />
          <% } %>
          <Button title="<%- formAction.Name %>" onPress={() => this.props.parentProps.dispatch(actions.submit('<%- formAction.name %>Form'))}  />
        </Form>
