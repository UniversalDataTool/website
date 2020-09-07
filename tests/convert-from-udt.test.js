require("dotenv").config()
const micro = require("micro")
const test = require("ava")
const bent = require("bent")
const listen = require("test-listen")
const endpoint = require("../api/convert-from-udt.js")

const postUDT = bent("POST", "json", 200)
const getReq = bent("GET", "json", 200)

test("convert to pngs", async (t) => {
  const service = micro(endpoint)
  const url = await listen(service)
  const res = await postUDT(url, {
    desired_output: "mask_pngs",
    udt: {
      interface: {
        type: "image_segmentation",
        labels: ["valid", "invalid"],
        regionTypesAllowed: ["bounding-box", "polygon", "point"],
      },
      samples: [
        {
          imageUrl:
            "https://s3.amazonaws.com/asset.workaround.online/example-jobs/sticky-notes/image1.jpg",
          annotation: [
            {
              regionType: "bounding-box",
              id: "7627756957719891",
              centerX: 0.3083989501312336,
              centerY: 0.33661417322834647,
              width: 0.47506561679790027,
              height: 0.1220472440944882,
              classification: "valid",
              color: "#f44336",
            },
          ],
        },
        {
          imageUrl:
            "https://s3.amazonaws.com/asset.workaround.online/example-jobs/sticky-notes/image2.jpg",
          annotation: [
            {
              regionType: "bounding-box",
              id: "7861408314796452",
              centerX: 0.4055118110236221,
              centerY: 0.3661417322834646,
              width: 0.4173228346456693,
              height: 0.09842519685039369,
              classification: "invalid",
              color: "#2196f3",
            },
          ],
        },
      ],
    },
  })
  t.is(Boolean(res.job_id), true)
  t.is(res.progress, 0)
  t.is(res.totalTasks, 3)

  const res2 = await getReq(url + `?job_id=${res.job_id}`)

  t.is(res2.progress, 1)
  t.is(Boolean(res2.downloadUrl), true)
})
