import React, { useState, useEffect } from 'react';
import "./Blog.scss";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from "../media/place-holder.jpg"
import { useAuthContext } from "../hooks/useAuthContext";

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

    //const { isLoggedIn } = useAuthContext(); // Access isLoggedIn state from authentication context

    const posts = [
        {
            id: 1,
            title: 'The Rise of Bitcoin: BEWARE OF IT!',
            date: 'April 1, 2024',
            author: 'Jack Griffin',
            image: 'got annoyed', 
            content: 'Bitcoin, the pioneer cryptocurrency, has been gaining momentum in recent years. With its decentralized nature and limited supply, it has attracted investors and enthusiasts alike. However, the journey of Bitcoin has been tumultuous, marked by highs and lows. In this post, we explore the rise of Bitcoin and its impact on the financial world.',
        },
        {
            id: 2,
            title: 'Understanding Blockchain Technology',
            date: 'April 2, 2024',
            author: 'Jack Daniels',
            image: 'got annoyed', 
            content: 'Blockchain technology is the backbone of cryptocurrencies like Bitcoin. It offers a secure and transparent way of recording transactions. But what exactly is blockchain? How does it work? In this post, we delve into the inner workings of blockchain technology and its potential applications beyond cryptocurrencies.',
        },
        {
            id: 3,
            title: 'Investing in Altcoins: Opportunities and Risks',
            date: 'April 3, 2024',
            author: 'Jack Johnson',
            image: 'got annoyed', 
            content: 'While Bitcoin remains the most popular cryptocurrency, there are thousands of altcoins with unique features and use cases. Investing in altcoins can be lucrative, but it also comes with risks. In this post, we discuss the opportunities and risks associated with investing in altcoins, and how to navigate the volatile crypto market.',
        },
        {
            id: 4,
            title: 'The Future of Decentralized Finance (DeFi)',
            date: 'April 4, 2024',
            author: 'Jack Powells',
            image: 'got annoyed', 
            content: 'Decentralized Finance (DeFi) has emerged as a disruptive force in the traditional financial sector. By leveraging blockchain technology, DeFi platforms offer financial services without intermediaries, allowing for greater transparency and accessibility. In this post, we explore the potential of DeFi to revolutionize the way we manage and access financial services.',
        },
    ];

    // Render login prompt if user is not logged in
    // if (!isLoggedIn) {
    //     return (
    //         <div className="blog-container">
    //             <div className="login-prompt">
    //                 <p>Please Log In first to get Access to the Blog</p>
    //                 {/* Add login button or link */}
    //                 <Button variant="primary">Log In</Button>
    //             </div>
    //         </div>
    //     );
    // }

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
                                    <Card.Title>
                                        {post.title}
                                        <div className="post-info">
                                            <span className="date-author">{post.date}</span>
                                            <span className="date-author author-name">{post.author}</span>
                                        </div>
                                    </Card.Title>
                                    <Card.Text className="post-description">{post.content}</Card.Text>
                                    <Button variant="primary">Read More</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;