import DOMPurify from "dompurify";
import type { EpisodeData } from "./types";

type EpisodeProps = {
  data: EpisodeData;
};

const Episode = (props: EpisodeProps) => {
  const { name, id, description, link } = props.data;

  return (
    <details key={id} style={{ border: "1px solid" }}>
      <summary>
        <a href={link} download>
          {name}
        </a>
      </summary>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized with DOMPurify
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description),
        }}
      ></div>
    </details>
  );
};

export default Episode;
