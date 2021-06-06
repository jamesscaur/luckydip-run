import getConfig from "next/config";
// import Head from "next/head";
import Layout from "../components/layout";

const { publicRuntimeConfig } = getConfig();
const { title, description, url } = publicRuntimeConfig.siteMetaData;

const Home = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1>{title}</h1>
          <p>{description}</p>

          <h2>Get started</h2>
          <ul>
            <li>
              <a
                href={`${url}/share/1`}
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
            . We are planning to build some more cool stuff using BSV + RUN, follow us to stay tuned!
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
