"use client"; // This is a client component
import Image from "next/image";
import html2pdf from "html2pdf.js";

import iconOpenAi from "@/public/openai.png";

export default function HtmPdf() {
  const handleDownload = () => {
    var element = document.getElementById("element-to-print");

    /**
     * 设置PDF的参数
     * orientation 修改方向
     */
    var opt = {
      margin: 1,
      filename: "download.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: [200, 400], orientation: "landscape" },
    };
    html2pdf()
      .from(element)
      .set(opt)
      .toPdf()
      .get("pdf")
      .then(function (pdf: any) {
        // 创建一个临时的下载链接
        var downloadLink = document.createElement("a");
        downloadLink.href = pdf.output("bloburl");
        downloadLink.download = opt.filename;
        document.body.appendChild(downloadLink);

        // 触发下载
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
  };
  // const handleDownload = () => {
  //   var element = document.getElementById("element-to-print");
  //   var opt = {
  //     margin: 1,
  //     filename: "myfile.pdf",
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //   };

  //   // New Promise-based usage:
  //   html2pdf().set(opt).from(element).save();
  // };

  return (
    <div>
      <div
        className="text-gray-700 flex flex-col align-center items-center mt-10 mb-20"
        id="element-to-print"
      >
        <Image
          src={iconOpenAi}
          width={60}
          height={60}
          className="rounded-full  mr-2"
          style={{ width: 60, height: 60 }}
          alt="avatar"
        />
        <p className="text-gray-700 text-center">Hello word</p>
      </div>
      <div onClick={handleDownload}>down</div>
    </div>
  );
}
