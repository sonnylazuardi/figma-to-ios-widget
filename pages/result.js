import { useRouter } from "next/router";

export default function Result(props) {
  const [fullUrl, setFullUrl] = React.useState("");
  const router = useRouter();
  if (router.isFallback) {
    return (
      <main>
        <p>Showing URL! Loading...</p>
      </main>
    );
  }

  const { url } = props;

  React.useEffect(() => {
    const fullUrl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
    setFullUrl(fullUrl);
  }, []);

  return (
    <main>
      <h1>Your Widget</h1>

      <p>
        To show your widget install{" "}
        <a href="https://apps.apple.com/us/app/glimpse-2/id1524217845">
          Glimpse App
        </a>{" "}
        on your iPhone/iPad
      </p>
      <p>
        Add new Page, Enter any page name, and copy-paste this URL to page URL
      </p>
      <h2>
        {fullUrl}/widget/{url}
      </h2>

      <p>
        In home screen, add new widget, search Glimpse, choose the page you just
        added
      </p>
      <p>Voila 🥳 </p>
    </main>
  );
}

Result.getInitialProps = async ({ query }) => {
  let url = query.url;

  return { url };
};
