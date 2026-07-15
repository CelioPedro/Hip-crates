import { FacebookLogo, TwitterLogo, InstagramLogo, CaretDown } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <div className="footer-row">
      <div className="social">
        <a href="#" className="social-btn" aria-label="Twitter">
          <TwitterLogo weight="fill" size={20} />
        </a>
        <a href="#" className="social-btn" aria-label="Facebook">
          <FacebookLogo weight="fill" size={20} />
        </a>
        <a href="#" className="social-btn" aria-label="Instagram">
          <InstagramLogo weight="regular" size={20} />
        </a>
      </div>

      <a href="#" className="discover">
        Descubra mais
        <span className="arrow-down">
          <CaretDown weight="bold" size={16} />
        </span>
      </a>

      <div></div>
    </div>
  );
}
