import React, { useState, useEffect } from 'react';
import "./Blog.scss";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from "../media/place-holder.jpg"


const Blog = () => {
    // Define an array of blog posts

    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         const response = await fetch('/api/posts');
    //         const data = await response.json();
    //         setPosts(data);
    //     };

    //     fetchPosts();
    // }, []);
    const posts = [
        {
            id: 1,
            title: 'Post 1',
            image: 'got annoyed', 
            content: 'There are stories that are true, in which each individual’s tale is unique and tragic, and the worst of the tragedy is that we have heard it before, and we cannot allow ourselves to feel it too deeply. We build a shell around it like an oyster dealing with a painful particle of grit, coating it with smooth pearl layers in order to cope. This is how we walk and talk and ',
        },
        {
            id: 2,
            title: 'Post 2',
            image: 'got annoyed', 
            content: 'There are stories that are true, in which each individual’s tale is unique and tragic, and the worst of the tragedy is that we have heard it before, and we cannot allow ourselves to feel it too deeply. We build a shell around it like an oyster dealing with a painful particle of grit, coating it with smooth pearl layers in order to cope. This is how we walk and talk and ',
        },
        {
            id: 3,
            title: 'Post 3',
            image: 'got annoyed', 
            content: 'There are stories that are true, in which each individual’s tale is unique and tragic, and the worst of the tragedy is that we have heard it before, and we cannot allow ourselves to feel it too deeply. We build a shell around it like an oyster dealing with a painful particle of grit, coating it with smooth pearl layers in order to cope. This is how we walk and talk and ',
        },
        {
            id: 4,
            title: 'Post 4',
            image: 'got annoyed', 
            content: 'There are stories that are true, in which each individual’s tale is unique and tragic, and the worst of the tragedy is that we have heard it before, and we cannot allow ourselves to feel it too deeply. We build a shell around it like an oyster dealing with a painful particle of grit, coating it with smooth pearl layers in order to cope. This is how we walk and talk and ',
        },
    ];
    return (
        <div className="blog-container">
            {posts.length === 0 ? (
                <p className='error-message'>No posts to display</p>
            ) : (
                <div className="row">
                    {posts.map((post) => (
                        <div key={post.id} className="col-lg-3 col-md-6 mb-4">
                            <Card>
                                <Card.Img variant="top" src={image} />
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.content}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            <div className="d-flex justify-content-center mt-3">
                <Button variant="primary">Read More</Button>
            </div>
        </div>
    );
};

export default Blog;