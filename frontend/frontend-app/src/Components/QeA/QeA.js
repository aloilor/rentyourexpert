import React, { useEffect, useState } from 'react';

function QeA({ id }) {
  const [questions, setQuestions] = useState([]);
  const authToken = localStorage.getItem('auth_token');
  const authTokenParts = authToken ? authToken.split(';') : [];
  const firstAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[0] : null;
  const lastAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[authTokenParts.length - 1] : null;


  useEffect(() => {
    fetch(`http://localhost:5005/catalogue/${id}`)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.log(error));
  }, [id]);


  const handleAnswerSubmit = (event, questionId) => {
    event.preventDefault();
    const answer = event.target.answer.value;
    fetch(`http://localhost:5005/worker_profile/${id}/qea/${questionId}`, {
      method: 'POST',
      headers: {
        'Authorization': authToken,
      },
      body: new FormData(event.target),
    })
      .then(response => {
        if (response.ok) {
          setQuestions(questions => {
            const updatedQuestions = questions.map(question => {
              if (question.id === questionId) {
                return { ...question, answer };
              } else {
                return question;
              }
            });
            return updatedQuestions;
          });
        } else {
          throw new Error('Failed to add answer');
        }
      })
      .catch(error => console.error(error));
  };

  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    const question = event.target.question.value;
    fetch(`http://localhost:5005/catalogue/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `question=${question}`,
    })
      .then(response => {
        if (response.ok) {
          setQuestions(questions => [
            ...questions,
            {
              id: questions.length + 1,
              username: 'You',
              question,
              answer: null,
            },
          ]);
        } else {
          throw new Error('Failed to add question');
        }
      })
      .catch(error => console.error(error));
  };

  

  if (firstAuthTokenPart === id && lastAuthTokenPart === 'W') {
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
            <form onSubmit={event => handleAnswerSubmit(event, question.id)}>
              <label htmlFor="answer">Answer:</label>
              <input type="text" name="answer" />
              <button type="submit">Submit</button>
            </form>
          )}
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
  } else {
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
            </li>
          ))}
        </ul>
        <h2>Add Question</h2>
        <form onSubmit={handleQuestionSubmit}>
          <label htmlFor="question">Question:</label>
          <input type="text" name="question" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default QeA;