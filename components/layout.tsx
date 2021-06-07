import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { asPath } = router;
  const { jigId, dipId } = router.query;

  const {
    url,
    // twitterHandle,
    name,
    description,
    // socialPreview,
    title,
  } = publicRuntimeConfig.siteMetaData;

  let og = {
    text: `**${name}:** ${description}`,
    fontSize: '100px'
  }

  if (jigId) {
    const name = "Purple Cow";
    const winner = "jamesscaur@chainbow.io";
    og.text = `Check out this **${name}** won by *${addr}.*`
  }

  if (dipId) {
    const cause = "Against Malaria";
    og.text = `Lucky Dip **#${dipId}** is fundraising for **${cause}.**`
  }

  og.fontSize = og.text.length >= 60 ? "75px" : "100px";

  const socialPreview =`https://og-image.vercel.app/${encodeURIComponent(og.text)}.png?theme=light&md=1&fontSize=${og.fontSize}&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg&images=https%3A%2F%2Fwww.luckydip.run%2Ficons%2Flineal%2Fsvg%2F001-block.svg&widths=250&widths=250&heights=250&heights=250`

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" key="favicon" />
        <link rel="canonical" href={`${url}${asPath}`} key="canonical" />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter_card"
        />
        {/*<meta
          name="twitter:creator"
          content={twitterHandle}
          key="twitter_creator"
        />*/}
        <meta name="twitter:title" content={name} key="twitter_title" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter_description"
        />
        <meta
          name="twitter:image"
          content={`${socialPreview}`}
          key="twitter_image"
        />

        {/* Open Graph */}
        <meta property="og:url" content={`${url}${asPath}`} key="og_url" />
        <meta property="og:site_name" content={name} key="og_site_name" />
        <meta property="og:title" content={title} key="og_title" />
        <meta
          property="og:description"
          content={description}
          key="og_description"
        />
        <meta
          property="og:image"
          content={`${socialPreview}`}
          key="og_image"
        />
        <meta property="og:image:width" content={`1200`} key="og_image_width" />
        <meta
          property="og:image:height"
          content={`630`}
          key="og_image_height"
        />

        <meta name="description" content={description} key="description" />
        <title key="title">{title}</title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
