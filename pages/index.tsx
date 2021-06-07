import getConfig from "next/config";
import Layout from "../components/layout";
import Link from 'next/link'

const { publicRuntimeConfig } = getConfig();
const { title, description } = publicRuntimeConfig.siteMetaData;

const Home = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 ">
          <img src="/icons/lineal/svg/001-block.svg" className="max-h-20 mb-8" />
          <h1>{title}</h1>
          <p>{description}</p>

          <iframe width="100%" height="315" className="max-w-lg w-6/12" src="https://streamanity.com/embed/EJu1s0CPSmfj" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <Link href='/about'>
              <button type="button" className="text-blue-700 bg-white hover:bg-gray-100">
                  About LuckyDip.run
              </button>
          </Link>
          
          <h2>Get started</h2>
          <ul>
            <li>
              <a
                href={`/share/2`}
                className="app-link"
              >
                Check out the first ever lucky dip on BSV!
              </a>
            </li>
          </ul>

          <h2>Credits</h2>
          <p>
            This project is jointly maintained by{" "}
            <a
              href="https://twitter.com/jamesscaur"
              target="_blank"
              rel="noopener noreferrer"
              className="app-link"
            >
              @jamesscaur
            </a>{" "}
            and {" "}
            <a
              href="https://twitter.com/ankh2054"
              target="_blank"
              rel="noopener noreferrer"
              className="app-link"
            >
              @ankh2054
            </a>
            .
          </p>
          <p>We are planning to build some more cool stuff using BSV + RUN, follow us to stay tuned!</p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
