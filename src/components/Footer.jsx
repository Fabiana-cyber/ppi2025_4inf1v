import styles from "./Footer.module.css";
import { Github, Instagram, Phone} from 'lucide-react';

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.footer}>
       <div >  <p className='inf'> IFRN - Campus Macau</p>
        <p className='inf'>Curso Técnico em Infórmatica</p>
        <p className='inf'>Programação para a Internet 2025</p></div>
        <div className={styles.icons}>
            <a href="https://github.com/Fabiana-cyber">
          <Github />
          </a>
            <a href="">
            <Instagram />
            </a>
            <a href="">
            <Phone />
            </a>
        </div>
        <p className={styles.myName}>Fabiana Cunha Rodrigues</p>
      </div>
    </footer>
  );
}





// import { Github, Linkedin } from 'lucide-react';

// export function Footer() {
//   return (
//     <footer className={styles.container}>
//       <div className={styles.footer1}>
//         <p>Fabiana Cunha Rodrigues</p>
//         <div className={styles.icons}>
//           <Github />
//           <Linkedin />
//         </div>
//       </div>
//     </footer>
//   )
// }