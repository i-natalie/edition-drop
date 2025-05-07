// components/GitHubLink.tsx
import Image from "next/image";

const GitHubLink = () => {
  return (
    <a href="https://github.com/your-repo">
      <Image
        src="/logo.png" // Укажи путь к изображению
        alt="GitHub repository link"
        width={50} // Укажи ширину
        height={50} // Укажи высоту
      />
    </a>
  );
};

export default GitHubLink;
