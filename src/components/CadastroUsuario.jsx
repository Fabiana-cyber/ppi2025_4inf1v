import { useState } from "react";
import { Link } from "react-router";
import styles from "./CadastroUsuario.module.css";

export function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Confirmar Senha:", confirmSenha);
  }

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroCard}>
        <h2 className={styles.cadastroTitle}>Cadastro</h2>
        <form onSubmit={handleSubmit} className={styles.cadastroForm}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showSenha ? "text" : "password"}
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                className={styles.showPasswordButton}
                onClick={() => setShowSenha(!showSenha)}
              >
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmSenha">Confirmar Senha</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmSenha ? "text" : "password"}
                id="confirmSenha"
                value={confirmSenha}
                onChange={(e) => setConfirmSenha(e.target.value)}
                placeholder="Confirme sua senha"
              />
              <button
                type="button"
                className={styles.showPasswordButton}
                onClick={() => setShowConfirmSenha(!showConfirmSenha)}
              >
              </button>
            </div>
          </div>

          <button type="submit" className={styles.cadastroButton}>
            Cadastrar
          </button>
        </form>

        <p className={styles.loginText}>
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}