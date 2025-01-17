import { useEffect } from 'react';
import { useAddNotification } from '@modules/notification';

export default function useUpdate() {
  const add = useAddNotification();
  const showShouldUpdate = () => {
    add({
      message: 'New version',
      type: 'info',
      description: 'A new version is available. Please refresh the page to update.',
    });
  };

  useEffect(() => {
    document.body.addEventListener(
      'plugin_web_update_notice',
      showShouldUpdate,
    );
    return () => {
      document.body.removeEventListener(
        'plugin_web_update_notice',
        showShouldUpdate,
      );
    };
  }, []);

  return null;
}
