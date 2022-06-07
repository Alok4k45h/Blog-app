import { Link } from "react-router-dom";
import "./post.css";

// setting all things based on passed props data value
export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((eachCat) => (
            <span className="postCat">
              <Link className="link" to={`/?cat=${eachCat.name}`}>
                {eachCat.name}
              </Link>
            </span>
          ))}
        </div>

        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>

        <hr />

        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
