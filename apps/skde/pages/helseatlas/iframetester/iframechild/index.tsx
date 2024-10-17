import useSiblingFrames from "../../../../src/helpers/hooks/useSiblingFrames";
import usePostMessageHandler from "../../../../src/helpers/hooks/usePostMessageHandler";
export default function IframeChild() {
  const { siblingFrames, domain } = useSiblingFrames();
  const [message, sendMessage] = usePostMessageHandler(siblingFrames, domain);

  return (
    <div>
      <h1>IframeChild</h1>
      <button
        onClick={() => sendMessage({ type: "test", data: "Hello from iframe" })}
      >
        Send Message
      </button>
      {message && <p>{message.data}</p>}
    </div>
  );
}
