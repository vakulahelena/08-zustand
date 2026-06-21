import Link from "next/link";
import css from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Vakula Helena</p>
          <p>
            Contact us:
            <a href="mailto:vakulahelena@gmail.com">vakulahelena@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
