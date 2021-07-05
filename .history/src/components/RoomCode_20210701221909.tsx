import copyImg from "../assets/images/copy.svg";

export default function RoomCode() {
  return (
    <button>
      <div>
        ]
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #</span>
    </button>
  );
}
