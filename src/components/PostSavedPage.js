import React from 'react';

class PostSavedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFinishMessage: false,
    }
  }

  handleShowFinishMessage() {
    this.setState({
      showFinishMessage: true,
    })
  }

  render() {
    return(
      <div className="post-saved-view">
        <h2>Post saved!</h2>
        <button onClick={() => this.props.addNewPost()}>Add another post</button>
        <button onClick={() => this.handleShowFinishMessage()}>Finish treasure hunt</button>
  
        {this.state.showFinishMessage &&
        <div className='final-message-and-submit'>
          <label>
            Do you want to give the player a final message when they finish your treasure hunt?
            <input onChange={(e) => this.props.handleInputChange(e)} name={'newFinalMessage'} maxLength={500} placeholder={"Max 500 characters"}></input>
          </label>
          <button onClick={() => this.props.handleSubmitNewHunt()}>Save treasure hunt</button>
        </div>
        }
      </div>
    )
  }
}

export default PostSavedPage;