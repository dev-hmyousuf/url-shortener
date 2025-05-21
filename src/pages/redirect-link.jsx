import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { getLongUrl } from "@/db/apiUrls";
import { storeClicks } from "@/db/apiClicks";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);
  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading, data]);

  useEffect(() => {
    if (data?.original_url && !loading && !loadingStats) {
      // Redirect after clicks are stored
      window.location.href = data.original_url;
    }
  }, [data, loading, loadingStats]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        <div className="text-white">Redirecting...</div>
      </>
    );
  }

  return null;
};

export default RedirectLink;
