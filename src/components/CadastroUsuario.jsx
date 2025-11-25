import { useContext, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CadastroUsuario.module.css";

export function CadastroUsuario() {
  const { handleSignUp, handleSignIn, loading, message, error } = useContext(SessionContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      alert("Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const result = await handleSignUp(email, password, username);

    if (result && result.error) {
      
      return;
    }

    
    const loginRes = await handleSignIn(email, password);
    if (loginRes && loginRes.error) {
      
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
      return;
    }

    // sucesso
    setTimeout(() => {
      navigate("/reader");
    }, 500);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Criar Conta</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Nome de usuário:</label>
        <input
          type="text"
          placeholder="Seu nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha:</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirmar senha:</label>
        <input
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.linkText}>
        Já possui conta? <Link to="/signin">Entrar</Link>
      </p>
    </div>
  );
}










// import { useState } from "react";
// import { Link } from "react-router";
// import styles from "./CadastroUsuario.module.css";

// export function CadastroUsuario() {
//   const [nome, setNome] = useState("");
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");
//   const [confirmSenha, setConfirmSenha] = useState("");
//   const [showSenha, setShowSenha] = useState(false);
//   const [showConfirmSenha, setShowConfirmSenha] = useState(false);

//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log("Nome:", nome);
//     console.log("Email:", email);
//     console.log("Senha:", senha);
//     console.log("Confirmar Senha:", confirmSenha);
//   }

//   return (
//     <div className={styles.cadastroContainer}>
//       <div className={styles.cadastroCard}>
//         <h2 className={styles.cadastroTitle}>Cadastro</h2>
//         <form onSubmit={handleSubmit} className={styles.cadastroForm}>
//           <div className={styles.formGroup}>
//             <label htmlFor="nome">Nome</label>
//             <input
//               type="text"
//               id="nome"
//               value={nome}
//               onChange={(e) => setNome(e.target.value)}
//               placeholder="Digite seu nome"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="email">E-mail</label>
//             <input
//               type="text"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Digite seu e-mail"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="senha">Senha</label>
//             <div className={styles.passwordWrapper}>
//               <input
//                 type={showSenha ? "text" : "password"}
//                 id="senha"
//                 value={senha}
//                 onChange={(e) => setSenha(e.target.value)}
//                 placeholder="Digite sua senha"
//               />
//               <button
//                 type="button"
//                 className={styles.showPasswordButton}
//                 onClick={() => setShowSenha(!showSenha)}
//               >
//               </button>
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="confirmSenha">Confirmar Senha</label>
//             <div className={styles.passwordWrapper}>
//               <input
//                 type={showConfirmSenha ? "text" : "password"}
//                 id="confirmSenha"
//                 value={confirmSenha}
//                 onChange={(e) => setConfirmSenha(e.target.value)}
//                 placeholder="Confirme sua senha"
//               />
//               <button
//                 type="button"
//                 className={styles.showPasswordButton}
//                 onClick={() => setShowConfirmSenha(!showConfirmSenha)}
//               >
//               </button>
//             </div>
//           </div>

//           <button type="submit" className={styles.cadastroButton}>
//             Cadastrar
//           </button>
//         </form>

//         <p className={styles.loginText}>
//           Já tem conta? <Link to="/login">Faça login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }