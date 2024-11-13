import { ChangeEvent } from "react";
import styles from "./style.module.css";

interface FileUploader {
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploader({ handleFileUpload }: FileUploader) {
  return (
    <div>
      <label className={styles.uploadButton}>
        Нажмите для загрузки файла
        <input
          type="file"
          className={styles.inputFile}
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}
