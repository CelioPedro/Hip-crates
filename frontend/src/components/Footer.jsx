import { FacebookLogo, TwitterLogo, InstagramLogo, CaretDown } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <div className="footer-row">
      <div className="social">
        {/* Social icons migrated to ImmersiveSection choreography */}
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
