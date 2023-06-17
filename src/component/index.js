import React, { useState } from "react";
import PostList from "./postList";

import DetailPost from "./detailPost/index";
import WritePost from "./writePost";

const Index = () => {
  const [selectedPost, setSelectedPost] = useState('');
  const [page, setPage] = useState('list');

    if(page == "list")
        return(<PostList setPage={setPage} setSelectedPost={setSelectedPost} />)
    if(page == "detail")
        return(<DetailPost setPage={setPage} selectedPost={selectedPost} />) 
    if(page == "write")
        return(<WritePost setPage={setPage} />)
}

export default Index;
