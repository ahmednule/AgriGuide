import { convertMarkdownToHtml } from "@/lib/utils";
import React from "react";
import { useFormStatus } from "react-dom";

const ScanResponse = ({
  response,
  isScanSuccess,
}: {
  response: string;
  isScanSuccess: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      {isScanSuccess &&
        (!pending ? (
          <div>
            <h3 className="text-lg font-bold mb-4 text-emerald-950">
              Response
            </h3>
              <div
                className="edit-cont text-emerald-800 bg-green-50 p-4 rounded-lg"
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownToHtml(response),
                }}
              />
          </div>
        ) : null)}
    </>
  );
};

export default ScanResponse;
