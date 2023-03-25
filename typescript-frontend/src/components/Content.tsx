interface Content {
  name: string,
  exerciseCount: number,
}

interface ContentProps {
  contents: Content[]
}

const Content = (props: ContentProps) => 
  <>
    {
    props.contents.map(content => 
      <p key={content.name}>{content.name} {content.exerciseCount}</p> 
    )
    }
  </>;

  export default Content;