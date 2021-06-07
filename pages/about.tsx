import Layout from "../components/layout";
import Link from 'next/link'

const About = () => {
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4 ">
            <img src="/icons/lineal/svg/001-block.svg" className="max-h-20 mb-8" />
            <h1>About LuckyDip.run</h1>
            <iframe width="375" height="300" src="https://streamanity.com/embed/EJu1s0CPSmfj" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <p className="mt-6">LuckyDip is a modern take on a classic fundraising model!</p>
            <p>It uses the recently released <a href="https://run.network">RUN protocol</a> for <a href="https://bitcoinsv.com/en">Bitcoin SV</a> to allow fundraisers to set up a "lucky dip" with a pool of mystery prizes (NFTs, or jigs are they are called in the RUN protocol).</p>
            <p>Bitcoin users can "draw" a prize from a lucky dip by sending money to an address that's hosting the lucky dip. That address, in turn, does a random selection of the prizes (NFTs) it has, and sends it (plus any change) to the user.</p>
            <p>Lucky dip creators have full control over the profits from their lucky dips, and can modify at any time the rules of their lucky dip.</p>
            <Link href='https://github.com/jamesscaur/luckydip-run/#bsv-lucky-dip'>
                <button type="button" className="text-blue-700 bg-white hover:bg-gray-100">
                    More info (and development instructions) on the README
                </button>
            </Link>
            <Link href='/'>
                <button type="button" className="bg-blue-500 hover:bg-blue-600">
                    Home
                </button>
            </Link>
            <p className="mt-20"><em>Icon is from the <a href="https://www.flaticon.com/packs/video-games-8">SmashIcons video game icon pack, which you can find on Flaticon here.</a></em></p>
          </div>
        </section>
      </Layout>
    );
  };
  
  export default About;
  