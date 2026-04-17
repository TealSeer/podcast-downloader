import DOMPurify from "dompurify";
import type { EpisodeData } from "./types";

type EpisodeProps = {
  data: EpisodeData;
  toggleListener: (id: string, newVal: boolean) => void;
  listened: boolean;
};

const Episode = (props: EpisodeProps) => {
  const { listened, toggleListener } = props;
  const { name, id, description, link } = props.data;

  return (
    <details style={{ border: "1px solid" }}>
      <summary>
        <input
          type="checkbox"
          title="Listened"
          defaultChecked={listened}
          onChange={(e) => toggleListener(id, e.target.checked)}
        />
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
