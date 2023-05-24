import { message } from 'antd';
import { FiLink } from "react-icons/fi";
import './copyUrl.scss'

const CopyUrl = ({ gifUrl }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: `Copied url to clipboard!`,
        duration: 3,
      });
    }, 1000);
  };

  async function copyToClip() {
    await navigator.clipboard.writeText(gifUrl);
  }

  return (
    <>
      {contextHolder}
      <div className="copy-url-button" onClick={() => { copyToClip(); openMessage(); }}>
        <FiLink />
      </div>
    </>
  );
};

export default CopyUrl;