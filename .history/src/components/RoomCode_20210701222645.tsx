import { cloneDeep } from "@babel/types";
import copyImg from "../assets/images/copy.svg";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export default function RoomCode({ code }: RoomCodeProps) {
  return (
    <button>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
