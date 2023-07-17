import React from "react";
import {
  createSite,
  getSites,
  updateSite,
} from "../../components/DataProvider";
import GenericModal from "../UI/GenericModal";
import { DownChevron, ErrorText } from "../ui-helpers";
import { useRouter } from "next/navigation";
import { useSitesByOwner } from "../DataProvider";
import { apiRequest } from "../../util/network";

export default function TemplateModal({ site, onComplete }) {
  const router = useRouter();
  console.log("the current site is  ", site);
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  const [customPageToggled, setCustomPageToggled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const createSiteSubmit = async () => {
    setLoading(true);
    // var query = createSite({ siteName: siteName, pageName: pageName });

    const templatePage = await apiRequest(`item?id=${selectedTemplate}`);

    if (!templatePage.data[0]?.page) {
      setError("Template not found");
      setLoading(false);
      return;
    }

    const templatePageData = templatePage.data[0]?.page;
    const updatedSite = {
      ...site,
      page: templatePageData,
    };
    var query; // = updateSite(site._id, updatedSite);

    if (site._id == undefined) {
      query = createSite({
        ...updatedSite,
        siteName: site.siteName,
        pageName: site.pageName,
      });
    } else {
      query = updateSite(site._id, {
        ...site,
        siteName: site.siteName,
        pageName: site.pageName,
        page: templatePageData,
      });
    }

    query
      .then((result) => {
        console.log(result);
        const site = result.site;

        window.setTimeout(() => {
          // router.push("/" + site.siteName + "/" + site.pageName);
          window.location = "/" + site.siteName + "/" + site.pageName;
          onComplete();
        }, 1000);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <GenericModal onDone={() => onComplete()}>
      <div className={"flex flex-col w-[88vw] md:w-[60vw] items-center"}>
        <center className={"text-2xl"}>Choose a template</center>

        {!customPageToggled ? (
          <div className="flex w-full flex-row flex-wrap justify-center">
            {[
              {
                path: "docs.eth/linktree",
                name: "Linktree",
                image:
                  "https://github.com/metadatalabs/static-assets/blob/main/images/template-linktree.png?raw=true",
                tags: ["links"],
              },
              {
                path: "docs.eth/template-blog",
                name: "Blog",
                image:
                  "https://github.com/metadatalabs/static-assets/blob/main/images/template-blog2.png?raw=true",
                tags: ["blog"],
              },
              {
                path: "docs.eth/blog",
                name: "Vitalik's Blog",
                image:
                  "https://github.com/metadatalabs/static-assets/blob/main/images/template-blog.png?raw=true",
                tags: ["blog", "minimal"],
              },
              {
                path: "docs.eth/template-store",
                name: "Store",
                image:
                  "https://github.com/metadatalabs/static-assets/blob/main/images/template-store.png?raw=true",
                tags: ["payment"],
              },
              {
                path: "docs.eth/profile",
                name: "Blank Starter",
                tags: ["minimal"],
              },
            ].map((item, index) => {
              return (
                <div
                  className={`card w-56 m-2 bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition-all ${
                    item.path == selectedTemplate ? "outline " : ""
                  }`}
                  onClick={() => setSelectedTemplate(item.path)}
                >
                  <figure
                    className="w-full h-36 bg-gray-100"
                    style={{ alignItems: "flex-start" }}
                  >
                    <img
                      src={
                        item.image ||
                        "https://studio.uxpincdn.com/studio/wp-content/uploads/2016/06/12-Timeless-UI-Layouts.png.webp"
                      }
                      className={!item.image && "pt-4"}
                      alt="Template Image"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <div className="card-actions justify-between items-center">
                      <h2 className="card-title text-sm truncate">
                        {item.name}
                      </h2>
                    </div>
                    <div>
                      {/* <div className="badge badge-secondary">NEW</div> */}
                      {item.tags &&
                        item.tags.map((tag) => (
                          <div className="badge badge-outline mx-1">{tag}</div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Choose an existing page</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        )}

        <button
          className={`btn mt-4 ${loading ? `loading` : ``}`}
          disabled={loading}
          onClick={async () => createSiteSubmit()}
        >
          Apply to {JSON.stringify(site.pageName)}
        </button>
        {error && <ErrorText>{error}</ErrorText>}
        <a
          className="link mt-4"
          onClick={() => setCustomPageToggled(!customPageToggled)}
        >
          {!customPageToggled ? "Choose a custom page" : "Use a template"}
        </a>
      </div>
    </GenericModal>
  );
}
