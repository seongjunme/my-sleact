import axios from 'axios';

const fetcher = async ({ url }: { url: string }) => {
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data;
};

export default fetcher;
