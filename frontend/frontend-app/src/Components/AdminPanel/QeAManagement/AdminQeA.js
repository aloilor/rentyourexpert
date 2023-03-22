import React, { useEffect, useState } from 'react';

function AdminQeA({ id }) {
  const [questions, setQuestions] = useState([]);
  


  useEffect(() => {
    fetch(`http://localhost:5005/catalogue/${id}`)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.log(error));
  }, [id]);

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:5005/question/${id}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if (response.status === 200) {
            const updatedQuestion = questions.filter(questions => questions.id !== id);
            setQuestions(updatedQuestion);
        }
    })
    .catch((error) => console.log(error));
};

  

  return (
    <div>
    <h2>Questions</h2>
    <ul>
    {questions.map(question => (
      <li key={question.id}>
        <div>Username: {question.username}</div>
        <div>Question: {question.question}</div>
        <div>Answer: {question.answer ? (
                 <div>{question.answer}</div>
              ) : (
                <div>Not answer yet...</div>
        )}</div>
        <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
      </li> 
    ))}
      </ul>
      </div>
    )
}



export default AdminQeA;