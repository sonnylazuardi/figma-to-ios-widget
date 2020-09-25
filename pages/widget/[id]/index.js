import { useRouter } from "next/router";

export default function Widget(props) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <main>
        <p>Creating! Loading...</p>
      </main>
    );
  }

  const { imgSrc, shortcut } = props;

  return (
    <a href={shortcut}>
      <img src={imgSrc} style={{ width: "100%" }} />
    </a>
  );
}

Widget.getInitialProps = async ({ query }) => {
  let id = query.id;
  const res1 = await fetch(`https://plugin-api.sonnylab.com/widget?user=${id}`);
  const result1 = await res1.json();

  const fileKey = result1.widget.fileKey;
  const nodeId = result1.widget.nodeId;

  const res2 = await fetch(
    `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}`,
    {
      method: "get",
      headers: {
        "X-FIGMA-TOKEN": `64524-4ad2eac7-e39b-460c-8af1-d3eca114e426`,
      },
    }
  );
  const result2 = await res2.json();

  const imgSrc = result2.images[nodeId];
  const shortcut = result1.widget.shortcut;

  return { imgSrc, shortcut };
};
