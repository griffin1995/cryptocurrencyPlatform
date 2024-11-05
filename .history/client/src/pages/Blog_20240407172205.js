import React, { useState, useEffect } from "react";
import "./Blog.scss";
import { Col, Row, Card, Button } from "react-bootstrap";
import img1 from "../media/img1.jpg";
import img2 from "../media/img2.png";
import img3 from "../media/img3.jpg";
import img4 from "../media/img4.png";
import img5 from "../media/img5.jpg";
import img6 from "../media/img6.jpg";
import img7 from "../media/img7.jpg";
import img8 from "../media/img8.jpeg";

const imageMap = {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
};

export default function Blog() {

  const [visible, setVisible] = useState(4); // State variable for the number of visible posts

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const posts = [
    {
      id: 1,
      title: "The Rise of Bitcoin: BEWARE OF IT!",
      date: "April 1, 2024",
      author: "Jack Griffin",
      image: imageMap["img1"],
      content:
        "Bitcoin, the pioneer cryptocurrency, has been gaining momentum in recent years. With its decentralized nature and limited supply, it has attracted investors and enthusiasts alike. However, the journey of Bitcoin has been tumultuous, marked by highs and lows. In this post, we explore the rise of Bitcoin and its impact on the financial world.",
    },
    {
      id: 2,
      title: "Understanding Blockchain Technology",
      date: "April 2, 2024",
      author: "Jack Daniels",
      image: imageMap["img2"],
      content:
        "Blockchain technology is the backbone of cryptocurrencies like Bitcoin. It offers a secure and transparent way of recording transactions. But what exactly is blockchain? How does it work? In this post, we delve into the inner workings of blockchain technology and its potential applications beyond cryptocurrencies.",
    },
    {
      id: 3,
      title: "Investing in Altcoins: Opportunities and Risks",
      date: "April 3, 2024",
      author: "Jack Johnson",
      image: imageMap["img3"],
      content:
        "While Bitcoin remains the most popular cryptocurrency, there are thousands of altcoins with unique features and use cases. Investing in altcoins can be lucrative, but it also comes with risks. In this post, we discuss the opportunities and risks associated with investing in altcoins, and how to navigate the volatile crypto market.",
    },
    {
      id: 4,
      title: "The Future of Decentralized Finance (DeFi)",
      date: "April 4, 2024",
      author: "Jack Powells",
      image: imageMap["img4"],
      content:
        "Decentralized Finance (DeFi) has emerged as a disruptive force in the traditional financial sector. By leveraging blockchain technology, DeFi platforms offer financial services without intermediaries, allowing for greater transparency and accessibility. In this post, we explore the potential of DeFi to revolutionize the way we manage and access financial services.",
    },
    {
      id: 5,
      title: "Exploring the Potential of Ethereum",
      date: "April 5, 2024",
      author: "Jack Sanders",
      image: imageMap["img5"],
      content: "Ethereum, a prominent cryptocurrency, has garnered attention for its smart contract capabilities and potential for decentralized applications. In this post, we delve into the workings of Ethereum and its impact on the evolving landscape of blockchain technology."
    },
    {
      id: 6,
      title: "Navigating the World of NFTs",
      date: "April 6, 2024",
      author: "Jack Thompson",
      image: imageMap["img6"],
      content: "Non-Fungible Tokens (NFTs) have taken the digital world by storm, offering a new way to represent ownership of digital assets. In this post, we explore the concept of NFTs, their use cases, and the potential they hold for various industries."
    },
    {
      id: 7,
      title: "The Evolution of Cryptocurrency Mining",
      date: "April 7, 2024",
      author: "Jack Brown",
      image: imageMap["img7"],
      content: "Cryptocurrency mining plays a crucial role in maintaining blockchain networks and validating transactions. In this post, we trace the evolution of cryptocurrency mining from the early days of Bitcoin to the emergence of more efficient mining algorithms."
    },
    {
      id: 8,
      title: "The Impact of Stablecoins on Financial Markets",
      date: "April 8, 2024",
      author: "Jack Wilson",
      image: imageMap["img8"],
      content: "Stablecoins, cryptocurrencies pegged to stable assets like fiat currencies or commodities, have gained traction as a reliable store of value and medium of exchange. In this post, we analyze the impact of stablecoins on financial markets and their role in facilitating cross-border transactions."
    }
  ];
  return (
    <div>
    <Row className="mt-4">
      {posts.length === 0 ? (
        <p className="error-message">No posts to display</p>
      ) : (
        <>
          {Array(Math.ceil(posts.slice(0, visible).length / 4)).fill().map((_, rowIndex) => (
            <Row className="mt-4 mb-3" key={rowIndex}>
              {posts.slice(rowIndex * 4, (rowIndex + 1) * 4).map((post) => (
                <Col sm={3} key={post.id}>
                  <Card className="h-100">
                    <div className="image-container">
                      <Card.Img variant="top" src={post.image} className="img-fluid"/>
                    </div>
                    <Card.Body>
                      <Card.Title>
                        {post.title}
                        <div className="post-info">
                          <span className="date-author">{post.date}</span>
                          <span className="date-author author-name">
                            {post.author}
                          </span>
                        </div>
                      </Card.Title>
                      <Card.Text className="post-description">
                        {post.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              </Row>
          ))}
        </>
      )}
    </Row>
    {visible < posts.length && 
    <div className="d-flex justify-content-center mt-3">
       <Button className="btn btn-custom" onClick={loadMore}>Read More</Button> 
    </div>
    }
    {visible > 4 && 
      <div className="d-flex justify-content-center mt-3">
        <Button className="btn btn-custom" onClick={() => setVisible(4)}>Read Less</Button>
      </div>
    }
</div>
  );
}
