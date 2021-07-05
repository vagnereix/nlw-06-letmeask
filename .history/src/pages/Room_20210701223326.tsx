import { Button } from "../components/Button";
import RoomCode from "../components/RoomCode";
import "../styles/room.scss";

export function Room() {
  return (
    <div className="page-room">
      <header>
        <img src="" alt="Letmeask" />
        <RoomCode code="12131" />
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que você quer perguntar?" />

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
