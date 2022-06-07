import { useLocation } from "react-router";
import { useState, useEffect} from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";

export default function Homepage() {
  const [posts, setposts] = useState([])

  // useLocation() gives us an object having key search which has value as  QueryParameter as "?username=alok" from requested url so we can destructure it as 
  const {search} = useLocation();

  // We have to fire this useEffect whenever the search variable is changed 
  useEffect(() => {
    // defining the fetchPosts() function
    const fetchPosts= async()=>{
      const res= await axios.get("/posts"+search)
      setposts(res.data)
    }
    // calling the fetchPosts() function 
    fetchPosts();
  }, [search])
  return (
    <>
      <Header />
      <div className="home">
        {/*calling Posts component passing the posts state variable containing all fetched data*/}
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}
