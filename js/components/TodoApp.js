/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoList from './TodoList';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

class TodoApp extends React.Component {
  _handleTextInputSave = text => {
    AddTodoMutation.commit(
      this.props.relay.environment,
      text,
      this.props.viewer,
    );
  };
  render() {
    const hasTodos = this.props.viewer.totalCount > 0;
    return (
      <div>
        <section className="todoapp">
	    
          <header className="header" >
<div style={{padding:20}}>
            <h1>PromoClub Hata Raporlama</h1>
</div>

	    
            <TodoTextInput
              autoFocus={true}
              className="new-todo"
              onSave={this._handleTextInputSave}
              placeholder="Lütfen Hataları belirtiniz."
            />
          </header>
          <TodoList viewer={this.props.viewer} />
          {hasTodos && (
            <TodoListFooter
              todos={this.props.viewer.todos}
              viewer={this.props.viewer}
            />
          )}
        </section>
        <footer className="info">
          <p>Düzenleme için çift tıklayın.</p>
          <p>
            Raporlama Sistemi{' '}
            <a href="https://interlink.com.tr">Interlink.com.tr</a>
          </p>
          
        </footer>
      </div>
    );
  }
}

export default createFragmentContainer(TodoApp, {
  viewer: graphql`
    fragment TodoApp_viewer on User {
      id
      totalCount
      ...TodoListFooter_viewer
      ...TodoList_viewer
    }
  `,
});
