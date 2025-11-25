import styles from "./Reader.module.css";
import { useSession } from "../context/SessionContext";

export default function Reader() {
  const { user } = useSession();

  return (
    <div className={styles.reader}>
      <h1>Bem-vindo ao Reader</h1>
      <p className={styles.subtitle}>Você está logado e pode começar a usar o aplicativo.</p>
      <div className={styles.info}>
        <p>
          <strong>Usuário:</strong> {user?.email || user?.id || "—"}
        </p>
      </div>
    </div>
  );
}
