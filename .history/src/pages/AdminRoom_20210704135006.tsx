import { Button } from "../components/Button";
import { useParams } from "react-router";

import RoomCode from "../components/RoomCode";

import logoImg from "../assets/images/logo.svg";

import "../styles/admin-room.scss";
import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../services/firebase";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();

  const [newQuestion, setNewQuestion] = useState("");

  const { title, questions } = useRoom(params.id);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") return;

    if (!user) throw new Error("You must be logged in.");

    // Criando a estrutura que eu quero guardar no banco
    const question = {
      content: newQuestion,
      author: {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${params.id}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id} />
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
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
