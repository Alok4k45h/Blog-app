import Post from "../post/Post";
import "./posts.css";

// setting for calling Post component by passing fetched data
export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts.map((eachpost)=>{
        return <Post post={eachpost}/>
      })}
    </div>
  );
}
