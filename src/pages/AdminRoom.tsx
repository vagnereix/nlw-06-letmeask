import { Button } from "../components/Button";
import { useParams } from "react-router";

import RoomCode from "../components/RoomCode";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import answerImg from "../assets/images/answer.svg";

import "../styles/room.scss";
// import { useAuth } from "../contexts/AuthContext";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();

  const history = useHistory();
  const params = useParams<RoomParams>();

  const { title, questions } = useRoom(params.id);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem cereteza que deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleCloseRoom() {
    await database.ref(`rooms/${params.id}`).update({
      closedAt: new Date(),
    });

    history.push("/");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={params.id} />
            <Button onClick={handleCloseRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <button
                  type="button"
                  onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12.0003"
                      cy="11.9998"
                      r="9.00375"
                      stroke="#737380"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                      stroke="#737380"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Answer question" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Delete question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
