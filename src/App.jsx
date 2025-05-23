import "./styles/theme.css";
import "./styles/global.css";
import { MyText } from "./components/MyText";
function App() {

  const text = [
    {
      title: "Meu titulo 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deserunt sapiente corporis. Iste in dolor, quibusdam ad aut eius dicta esse voluptatem, deserunt dolore consequatur cum sunt eaque sequi quam.",
    },
    {
      title: "Meu titulo 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deserunt sapiente corporis. Iste in dolor, quibusdam ad aut eius dicta esse voluptatem, deserunt dolore consequatur cum sunt eaque sequi quam.",
    },
    {
      title: "Meu titulo 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deserunt sapiente corporis. Iste in dolor, quibusdam ad aut eius dicta esse voluptatem, deserunt dolore consequatur cum sunt eaque sequi quam.",
    },
    {
      title: "Meu titulo 4",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deserunt sapiente corporis. Iste in dolor, quibusdam ad aut eius dicta esse voluptatem, deserunt dolore consequatur cum sunt eaque sequi quam.",
    }
  ]
  return (
    <>
    {text.map((text, index) => (
      <MyText key={index} title={`${index + 1}. ${text.title}` }>
        {text.text}
      </MyText>
    ))}
    </>
  );
}

export default App;
