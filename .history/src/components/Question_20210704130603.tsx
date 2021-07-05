type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
};

export function Question() {
  return (
    <div className="question">
      <p></p>
      <footer>
        <div className="user-info">
          <img src="" alt="" />
          <span></span>
        </div>
        <div></div>
      </footer>
    </div>
  );
}
