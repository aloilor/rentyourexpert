import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardGroup
} from 'mdb-react-ui-kit';
import { FaGlobe, FaGithub, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button, Form, Input } from 'react-bootstrap';



function QeA({ id }) {
  const [questions, setQuestions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(false);

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

  const handleAnswerUpdate = (event, questionId) => {
    event.preventDefault();
    const answer = event.target.answer.value;
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        return { ...question, answer };
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
    setEditMode(false);
    fetch(`http://localhost:5005/worker_profile/${id}/qea/${questionId}`, {
      method: 'PUT',
      headers: {
        'Authorization': authToken,
      },
      body: new FormData(event.target),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update answer');
      }
    })
    .catch(error => console.error(error));
  };


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

  

  if (lastAuthTokenPart=='W' && firstAuthTokenPart === id ) {
    return (
      <div className="w-100">
      <MDBCol lg="8">
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBCardText>
              <h2>Questions</h2>
              {questions.map(question => (
                <MDBCard key={question.id}>
                  <MDBCardBody>
                    <div>Username: {question.username}</div>
                    <div>Question: {question.question}</div>
                    <div>
                      <MDBRow>
                        <MDBCol sm="3">Answer:</MDBCol>
                        <MDBCol sm="9">
                          {question.answer ? (
                            <div>
                              {editMode && question.id === editingQuestionId ? (
                                <form onSubmit={event => handleAnswerUpdate(event, question.id)}>
                                  <input type="text" name="answer" defaultValue={question.answer} />
                                  <button type="submit">Update</button>
                                </form>
                              ) : (
                                <div>
                                  {question.answer}
                                  <br />
                                  <button onClick={() => {
                                    setEditMode(true);
                                    setEditingQuestionId(question.id);
                                  }}>Edit</button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <form onSubmit={event => handleAnswerSubmit(event, question.id)}>
                              <input type="text" name="answer" />
                              <button type="submit">Submit</button>
                            </form>
                          )}
                        </MDBCol>
                      </MDBRow>
                    </div>
                  </MDBCardBody>
                  <hr />
                </MDBCard>
              ))}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
  } else {
    return (
      <div>
  <MDBCol lg="12">
    <MDBCard className="mb-4">
      <MDBCardBody>
        <h2>Add Question</h2>
        <form onSubmit={handleQuestionSubmit}>
          <label htmlFor="question">Question:</label>
          <input type="text" name="question" />
          <button type="submit">Submit</button>
        </form>
        <hr />
        <MDBCardText>
          <h2>Questions</h2>
          {questions.map(question => (
            <MDBCard key={question.id} className="mb-3">
              <MDBCardBody>
                <MDBCardText>
                  <div>Username: {question.username}</div>
                  <div>Question: {question.question}</div>
                  <div>
                    <div>Answer:</div>
                    <div>{question.answer ? question.answer : "Not answered yet..."}</div>
                  </div>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          ))}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
</div>
    );
  }
}

export default QeA;


