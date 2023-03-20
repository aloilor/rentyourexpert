import React, { useEffect, useState } from 'react';


function QeA({ id }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5005/catalogue/${id}`)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.log(error));
  }, [id]);


  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map(questions => (
          <li key={questions.id}>
            <div>Username: {questions.username}</div>
            <div>Question: {questions.question}</div>
            <div>Answer: {questions.answer}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QeA;