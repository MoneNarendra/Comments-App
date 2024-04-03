import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {eachComment, userReacted, deleteComment} = props
  const {id, name, comment, isLiked, time, profileColor} = eachComment
  const likeClass = isLiked ? 'liked' : 'not-liked'
  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const userLiked = () => {
    userReacted(id)
  }

  const deleteCom = () => {
    deleteComment(id)
  }

  const getMinutesAge = formatDistanceToNow(time)

  return (
    <li className="each-comment">
      <div className="comment-profile">
        <p className={`profile ${profileColor}`}>{name[0]}</p>
        <div className="name-comment">
          <div className="name-container">
            <h1 className="name">{name}</h1>
            <p className="time">{getMinutesAge}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="comment-action">
        <button className="like-button" type="button" onClick={userLiked}>
          <img src={likeImg} alt="like" className="action-img" />

          <p className={`like-text ${likeClass}`}>Like</p>
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={deleteCom}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="action-img"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
