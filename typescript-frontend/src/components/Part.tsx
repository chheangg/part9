import { JsxElement } from "typescript";
import { CoursePart } from "../App";

const assertNever = (value: never): never => {
  throw new Error(
    `unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart) => {

  const content = (part: CoursePart): string | JSX.Element => {
    switch (part.kind) {
      case 'basic':
       return <em>part.description</em>;
      case 'group':
        return `project exercises ${part.groupProjectCount}`;
      case 'background':
        return <>
          {part.description}
          <br></br>
          submit to {part.backroundMaterial}`
        </>;
      case 'special':
        return <>
        {part.description}
        <br></br>
        required skill: {part.requirements.join(', ')}
        </>;
      default:
        assertNever(part);
        return '';
    }
  }; 

  return (
    <div>
      <h2>{props.name} {props.exerciseCount}</h2>
      <p>{content(props)}</p>
    </div>
  );
};

export default Part;