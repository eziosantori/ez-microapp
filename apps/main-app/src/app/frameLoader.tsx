import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { FramePostMessage } from '@ez-microapp/contracts';

export interface FrameLoaderProps {
  title?: string;
  src?: string;
  /**
   * Scatenato una volta completato il caricamento dell'iframe
   */
  onLoad?(): void;
  /**
   * Event raised from iframe
   */
  onTargetMessage?(data?: FramePostMessage): void;
}

export const FrameLoader: React.FC<FrameLoaderProps> = (
  props: FrameLoaderProps
) => {
  let iframe: any;
  const [uid, setUid] = useState("");
  useEffect(()=> {
    setUid(nanoid());
  }, [])
  const receiveMessage = (event: any) => {
    // const message = event.data.message;

    // if (message === "chiudiRegistrazioneVisita") {
    //     if (props.onTargetMessage) {
    //         props.onTargetMessage(event.data);
    //     }
    // }

    if (event.data.source && event.data.source === 'ez-microapp') {
      // eslint-disable-next-line no-console
      console.debug('FrameLoader.receiveMessage', event);
      if (props.onTargetMessage) {
        const data = {...event.data, uid: uid};
        props.onTargetMessage(data);
      }
    }
  };
  const handleOnLoad = () => {
    if (props.onLoad) props.onLoad();
  };
  useEffect(() => {
    if (iframe) {
      iframe.addEventListener('load', handleOnLoad);
    }
    window.addEventListener('message', receiveMessage, false);
    return () => {
      if (iframe) {
        // don't forget to remove listeners
        iframe.removeEventListener('load', handleOnLoad);
      }
      window.removeEventListener('message', receiveMessage, false);
    };
  }, []);

  const iframeStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '0',
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {props.src ? (
        <iframe
          title={props.title}
          // eslint-disable-next-line no-return-assign
          ref={(e) => (iframe = e)}
          src={`${props.src}?uid=${uid}`}
          width="100%"
          height="100%"
          // eslint-disable-next-line react/no-unknown-property
          frameBorder="0"
          style={iframeStyle}
        />
      ) : null}
    </>
  );
};

// export FrameLoader;
