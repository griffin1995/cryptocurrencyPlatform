import React, { useState } from 'react';
import '../css/Support.css';


const faqs = [
    {
        question: "Does this product have what I need?",
        answer: "Totally. Totally does."
    },
    {
        question: "Can I use it all the time?",
        answer: "Of course you can, we won't stop you."
    },
    {
        question: "Are there any restrictions?",
        answer: "Only your imagination my friend. Go forth!"
    },
    {
        question: "What is the return policy?",
        answer: "You can return the product within 30 days of purchase."
    },
    {
        question: "Do you offer customer support?",
        answer: "Yes, we offer 24/7 customer support."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleClick = (index, event) => {
        event.preventDefault();
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='grid-container'>
            <div className="faq-section">
                {faqs.map((faq, index) => (
                    <details key={index} open={index === openIndex}>
                        <summary onClick={(event) => handleClick(index, event)}>{faq.question}</summary>
                        <p>{faq.answer}</p>
                    </details>
                ))}
            </div>
        </div>
    );
};

export default FAQ;