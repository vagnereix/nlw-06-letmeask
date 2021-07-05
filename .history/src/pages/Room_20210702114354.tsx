import { Button } from "../components/Button";
import { useParams } from "react-router";

import RoomCode from "../components/RoomCode";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";
import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();

  const [newQuestion, setNewQuestion] = useState("");

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") return;

    if (!user) throw new Error("You must be logged in.");

    const question = {
      content: newQuestion,
      author: {
        id: user.id,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${params.id}/question`).push(question);
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
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            onChange={(event) => setNewQuestion(event.target.value)}
            placeholder="O que você quer perguntar?"
          />

          <div className="form-footer">
            <span>
              Para enviar uma pergunta, <button>faça seu login</button>.
            </span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
