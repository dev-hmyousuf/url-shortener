import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { getLongUrl } from "@/db/apiUrls";
import { storeClicks } from "@/db/apiClicks";

const RedirectLink = () => {
  const { id } = useParams();

  // Step 1: Fetch long URL
  const {
    loading: loadingUrl,
    data: urlData,
    fn: fetchUrl,
  } = useFetch(getLongUrl, id);

  // Step 2: Store click
  const {
    loading: loadingClick,
    fn: storeClick,
  } = useFetch(storeClicks, {
    id: urlData?.id,
    originalUrl: urlData?.original_url,
  });

  // Fetch URL on mount
  useEffect(() => {
    fetchUrl();
  }, []);

  // Store click after URL is fetched
  useEffect(() => {
    if (!loadingUrl && urlData) {
      storeClick();
    }
  }, [loadingUrl, urlData]);

  // Redirect once both fetch and store are complete
  useEffect(() => {
    if (urlData?.original_url && !loadingUrl && !loadingClick) {
      window.location.href = urlData.original_url;
    }
  }, [urlData, loadingUrl, loadingClick]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <BarLoader width={"100%"} color="#36d7b7" />
      <h1 className="text-xl mt-6 animate-pulse text-center">
        🔗 Redirecting to your destination...
      </h1>
      <p className="text-sm mt-2 text-gray-400">
        Please wait while we track the click and redirect you.
      </p>
    </div>
  );
};

export default RedirectLink;
