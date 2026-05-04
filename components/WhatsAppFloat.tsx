import Image from "next/image";

const WHATSAPP_LINK = "https://wa.me/2348012345678";

function WhatsAppIcon() {
  return (
    <Image
      src="/WhatsApp-Logo.jpg"
      alt="WhatsApp"
      width={112}
      height={112}
      className="transform -rotate-12"
    />
  );
}

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 hover:scale-105 transition"
    >
      <WhatsAppIcon />
    </a>
  );
}