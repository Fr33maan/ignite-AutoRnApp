{
          isEditing && (
            <Form model="<%- props.name %>Form"><%#
            %><% for (let propName in props.model) { 
              var prop = props.model[propName]
              var shortClose = prop.inputType !== 'Picker'
            %>
              <Text><%- prop.Name %></Text><%#
              %><% if(prop.inputType === 'TextInput') { %>
              <Errors
                  model="<%- props.name %>Form.<%- prop.name %>"
                  show={true}
                  messages={{
                    isRequired: validators.isRequired('<%- prop.name %>').msg,
                    <% if(prop.name === 'email')    { %>isEmail: validators.isEmail('<%- prop.name %>').msg,<% }
                       if(prop.name === 'password') { %>minLength: validators.minLength('<%- prop.name %>', 6).msg,<% } %>
                  }}
              />
              <% } %>
              <Control.<%- prop.inputType %>
                model=".<%- prop.name %>"<%#
                %><% if(prop.inputType === 'TextInput') { %>
                <% if(prop.prop === 'textarea') { %>
                multiline = {true}
                numberOfLines = {6}
                <% } %>
                validators={{
                  isRequired: validators.isRequired('<%- prop.name %>').fn,
                  <% if(prop.name === 'email')    { %>isEmail: validators.isEmail('<%- prop.name %>').fn,<% }
                     if(prop.name === 'password') { %>minLength: validators.minLength('<%- prop.name %>', 6).fn,<% } %>
                }}
                <% } %>
                <%- prop.inputType === 'TextInput' ? 'onBlur' : 'onChange' %>={(value, form) => form.valid && update<%- props.Name %><%- prop.Name %>(value)}
                <% if(prop.inputType === 'DatePickerIOS') { %>component={DatePicker}<% } %><%#
              %><% if(shortClose) { %>/<% } %>><%if (prop.inputType === 'Picker') { 
                for (let choice of prop.prop) { %>
                <Picker.Item label="<%- choice %>" value="<%- choice %>" /><%#
              %><% }} %>
              <% if(!shortClose) { %></Control.<%- prop.inputType %>><% } %><%#
            %><% } %>  
            </Form>
          ) || (
            <View>
            <% for (let propName in props.model) { 
              var prop = props.model[propName] %>
              <View>
                <Text><%- prop.Name %></Text>
                <Text>{<%- prop.name %>}</Text>
              </View>
            <% } %>  
            </View>
          )
        }
