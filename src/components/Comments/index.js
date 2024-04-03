import {Component} from 'react'
import {v4 as uuv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    userName: '',
    userComment: '',
    commentsList: [],
  }

  userReacted = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filterdList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: [...filterdList]})
  }

  addComment = event => {
    event.preventDefault()
    const {userName, userComment} = this.state
    const profileColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const newComment = {
      id: uuv4(),
      name: userName,
      comment: userComment,
      isLiked: false,
      time: new Date(),
      profileColor,
    }

    this.setState(prevComm => ({
      commentsList: [...prevComm.commentsList, newComment],
      userName: '',
      userComment: '',
    }))
  }

  userNameChange = event => {
    this.setState({userName: event.target.value})
  }

  commentChange = event => {
    this.setState({userComment: event.target.value})
  }

  render() {
    const {userName, userComment, commentsList} = this.state
    return (
      <div className="bg-container">
        <h1 className="main-heading">Comments</h1>
        <div className="top-section">
          <form className="top-text-container" onSubmit={this.addComment}>
            <p className="comment-discription">
              Say something about 4.0 Technologies
            </p>
            <input
              type="text"
              className="input-ele"
              placeholder="Your Name"
              onChange={this.userNameChange}
              value={userName}
            />
            <textarea
              type="text"
              className="comment-content"
              placeholder="Your Comment"
              onChange={this.commentChange}
              value={userComment}
            />
            <button type="submit" className="add-btn">
              Add Comment
            </button>
          </form>
          <div className="top-image-section">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-img"
            />
          </div>
        </div>
        <hr className="hr-line" />
        <div className="comments-section">
          <div className="comments-text">
            <p>
              <span className="comments-count">{commentsList.length}</span>{' '}
              Comments
            </p>
          </div>
          <ul className="list-comments">
            {commentsList.map(eachComment => (
              <CommentItem
                eachComment={eachComment}
                key={eachComment.id}
                userReacted={this.userReacted}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
