'use client';

import PocketBase from 'pocketbase';
import {useEffect} from 'react';

const pb = new PocketBase('https://copts-org-blog.pockethost.io');


const LogOut = () => {
  useEffect(() => {
    (async () => {
      await pb.authStore.clear();
      window.location.href = '/';
    })();
  }, []);
  return (
    <>
    </>
  );
}

export default LogOut;