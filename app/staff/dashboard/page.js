import { SupersetEmbedSDK, SupersetIframe } from "./SupersetEmbed";

const DashboardPage = () => {
  return (
    <div>
      <h1>Embedded Superset Dashboard</h1>
      {/* <SupersetEmbedSDK /> */}
      <SupersetIframe />
    </div>
  );
};
export default DashboardPage;
