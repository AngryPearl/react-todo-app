import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./EditForm.module.css";

export function EditForm({ content, isEdited, onFormSubmit }) {
  const [inputValue, setInputValue] = useState(content);

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(inputValue);
    isEdited();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <Button className={styles.button}>Zapisz</Button>
    </form>
  );
}
