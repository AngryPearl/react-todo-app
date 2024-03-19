import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./Task.module.css";
import { EditForm } from "../EditForm/EditForm";

export function Task({
  content,
  isDone,
  isFirst,
  isLast,
  onDeleteButtonClick,
  onToggleDone,
  onMoveUp,
  onMoveDown,
  onEdit,
}) {
  const [isEdited, setIsEdited] = useState(false);

  return (
    <li className={styles.task}>
      {!isEdited ? (
        <>
          <span
            onClick={() => setIsEdited(true)}
            className={`${styles.name} ${isDone ? styles.done : ""}`}
          >
            {content}
          </span>
          {!isDone && <Button onClick={onToggleDone}>Zrobione</Button>}
          <Button onClick={onDeleteButtonClick}>Usuń</Button>
          <Button disabled={isFirst} onClick={onMoveUp}>
            /\
          </Button>
          <Button disabled={isLast} onClick={onMoveDown}>
            \/
          </Button>
        </>
      ) : (
        <EditForm
          content={content}
          isEdited={() => setIsEdited(false)}
          onFormSubmit={onEdit}
        />
      )}
    </li>
  );
}
