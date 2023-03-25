import Part from "./Part";
import { CoursePart } from "../App";

interface ContentProps {
  contents: CoursePart[]
}

const Content = (props: ContentProps) => 
  <>
    {
    props.contents.map(content => 
      <Part key={content.name} {...content} />
    )
    }
  </>;

  export default Content;