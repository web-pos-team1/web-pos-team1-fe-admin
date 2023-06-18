import { useState } from 'react';
import { mapToBE } from "@/globalFunction/mapToBE";
import axios from "axios";
interface CSVDownloadProps {
  chartDate: string;
  storeId: number;
  startDate: string;
  endDate: string;
}
const MyComponent = (
  props : CSVDownloadProps
) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async () => {
    setIsDownloading(true);

    try {
      const fileName = `${props.chartDate}/${props.storeId}_sale_report`;
      const url = `http://localhost:8080/api/v1/hq/sale-management/list-csv/date=${props.chartDate}}/storeId=${props.storeId}/startDate=${props.startDate}/endDate=${props.endDate}`;
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("Error while downloading file", error);
    }

    setIsDownloading(false);
  }

  return (
    <div>
      <button name= "csv" onClick={downloadFile} disabled={isDownloading}>
        {isDownloading ? 'Downloading...' : 'CSV'}
      </button>
    </div>
  );
}

export default MyComponent;
