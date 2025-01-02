import SubjectItem from "./SubjectItem";

export default function AvailableSubjectItem({ subject, chooseAction }) {
  return (
    <SubjectItem subject={subject}>
      <SubjectItem.Body>
        <SubjectItem.ActionButton
          onClick={() => {
            chooseAction(subject.id);
          }}
        >
          Choose
        </SubjectItem.ActionButton>
      </SubjectItem.Body>
    </SubjectItem>
  );
}
